// Подключаем библиотеку ws для работы с WebSocket
// Если у вас Node.js 18+ и вы используете ES Modules, можно использовать `import WebSocket from 'ws';`
// Но для простоты и совместимости с более старыми версиями Node.js, используем require.
const WebSocket = require('ws');

// URL тестового эхо-сервера Postman
const websocketUrl = 'wss://ws.postman-echo.com/';

console.log(`Попытка подключения к WebSocket-серверу: ${websocketUrl}`);

// Создаем новый экземпляр WebSocket
const ws = new WebSocket(websocketUrl);

// Обработчик события 'open' - соединение установлено
ws.onopen = function open() {
    console.log('--- Соединение установлено! ---');
    console.log('Отправляю тестовое сообщение...');
    ws.send('Привет, Postman Echo!'); // Отправляем тестовое сообщение
};

// Обработчик события 'message' - получено сообщение от сервера
ws.onmessage = function incoming(event) {
    console.log(`--- Получено сообщение: "${event.data}" ---`);
    console.log('Закрываю соединение...');
    ws.close(); // Закроем соединение после получения первого сообщения
};

// Обработчик события 'error' - произошла ошибка
ws.onerror = function error(err) {
    console.error('--- WebSocket ОШИБКА: ---');
    console.error('Сообщение об ошибке:', err.message);
    console.error('Код ошибки (если есть):', err.code); // Может быть undefined
    console.error('Вся ошибка:', err);
};

// Обработчик события 'close' - соединение закрыто
ws.onclose = function close(event) {
    console.log('--- Соединение ЗАКРЫТО ---');
    console.log('Код закрытия:', event.code);
    console.log('Причина закрытия:', event.reason);
    console.log('Соединение было "чистым" (wasClean):', event.wasClean);
    if (event.code === 1006) {
        console.warn('Код 1006 (Abnormal Closure) часто указывает на проблемы с сетью, файрволом, или сервером недоступен.');
    }
};

// Установим таймаут, чтобы не ждать бесконечно.
// Если соединение не установится за 10 секунд, мы закроем его принудительно.
setTimeout(() => {
    if (ws.readyState === WebSocket.CONNECTING) {
        console.warn('Таймаут: Соединение не было установлено в течение 10 секунд.');
        ws.close(); // Попытаемся закрыть
    } else if (ws.readyState === WebSocket.OPEN) {
        console.log('Таймаут: Соединение всё ещё открыто, но не получено сообщение. Закрываю.');
        ws.close();
    }
}, 10000); // 10 секунд