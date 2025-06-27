document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const geoButton = document.getElementById('geoButton');
    const messageWindow = document.getElementById('messageWindow');

    const websocketUrl = 'wss://echo.websocket.events/';
    let websocket;

    // Функция для добавления сообщения в чат
    function addMessage(text, type = 'sent') {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.innerHTML = text; // Используем innerHTML для ссылок
        messageWindow.appendChild(messageDiv);
        // Прокручиваем окно сообщений до самого низа
        messageWindow.scrollTop = messageWindow.scrollHeight;
    }

    // Инициализация WebSocket соединения
    function initWebSocket() {
        if (websocket && websocket.readyState === WebSocket.OPEN) {
            console.log('WebSocket уже открыт.');
            return;
        }

        websocket = new WebSocket(websocketUrl);

        websocket.onopen = () => {
            console.log('WebSocket: Соединение установлено.');
            addMessage('Соединение с эхо-сервером установлено.', 'received');
        };

        websocket.onmessage = (event) => {
            // Эхо-сервер всегда отвечает тем же сообщением,
            // поэтому выводим его как "полученное"
            addMessage(`Эхо: ${event.data}`, 'received');
        };

        websocket.onerror = (error) => {
            console.error('WebSocket: Ошибка:', error);
            addMessage('Ошибка соединения с эхо-сервером.', 'received');
        };

        websocket.onclose = (event) => {
            console.log('WebSocket: Соединение закрыто:', event);
            addMessage('Соединение с эхо-сервером закрыто.', 'received');
        };
    }

    // Инициализируем WebSocket при загрузке страницы
    initWebSocket();

    // Обработчик для кнопки "Отправить"
    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message === '') {
            return; // Не отправляем пустое сообщение
        }

        addMessage(message, 'sent'); // Добавляем сообщение пользователя в чат

        if (websocket && websocket.readyState === WebSocket.OPEN) {
            websocket.send(message); // Отправляем сообщение на эхо-сервер
        } else {
            addMessage('Соединение с сервером не установлено. Попробуйте обновить страницу.', 'received');
            initWebSocket(); // Попробуем переподключиться, если соединение было закрыто
        }
        messageInput.value = ''; // Очищаем поле ввода
    });

    // Обработчик для кнопки "Геолокация"
    geoButton.addEventListener('click', () => {
        if ("geolocation" in navigator) {
            addMessage('Попытка получить геолокацию...', 'sent');

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { coords } = position;
                    const latitude = coords.latitude;
                    const longitude = coords.longitude;
                    const mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

                    // Выводим ссылку в чат
                    addMessage(`
                        Геолокация:
                        <a href="${mapLink}" target="_blank">Открыть карту</a>
                    `, 'geolocation');

                    // Если бы нужно было, можно было бы отправить координаты на сервер:
                    // if (websocket && websocket.readyState === WebSocket.OPEN) {
                    //     websocket.send(`Мои координаты: ${latitude}, ${longitude}`);
                    // }
                },
                (error) => {
                    console.error('Ошибка получения геолокации:', error);
                    let errorMessage = 'Не удалось получить геолокацию.';
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage += ' Пользователь отказал в доступе.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage += ' Информация о местоположении недоступна.';
                            break;
                        case error.TIMEOUT:
                            errorMessage += ' Истекло время ожидания запроса.';
                            break;
                        case error.UNKNOWN_ERROR:
                            errorMessage += ' Произошла неизвестная ошибка.';
                            break;
                    }
                    addMessage(`Ошибка геолокации: ${errorMessage}`, 'geolocation');
                },
                {
                    enableHighAccuracy: true, // Повышенная точность (может увеличить время и энергопотребление)
                    timeout: 5000,           // Максимальное время ожидания (5 секунд)
                    maximumAge: 0            // Не использовать кэшированные данные
                }
            );
        } else {
            addMessage('Геолокация не поддерживается вашим браузером.', 'geolocation');
        }
    });
});