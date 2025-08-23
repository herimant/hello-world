# 📰 Real-Time News Board

**Real-Time News Board** — это веб-приложение на `aiohttp` с WebSocket, которое позволяет в реальном времени:
- подключаться к серверу через WebSocket
- получать сообщения (новости) от сервера
- отображать новости на странице в удобном виде
- проверять соединение ping/pong
- отправлять новости на сервер через API (например, с другого сервиса)

## 🚀 Технологии
- Python 3.x
- aiohttp
- aiohttp_jinja2 + Jinja2
- WebSocket
- Bootstrap 5 (через CDN)

## ⚙ Структура проекта
news_ws_project/
├── server.py # Запуск приложения
├── app/
│ ├── init.py
│ ├── routes.py # Роуты приложения
│ ├── views.py # Обработчики HTTP и WS
│ ├── ws_manager.py # WebSocket менеджер
│ └── utils.py # Логирование
├── static/
│ ├── css/
│ │ └── styles.css # CSS стили
│ └── js/
│ └── main.js # WebSocket клиент
├── templates/
│ └── index.html # Основная страница
└── README.md

perl
Копировать
Редактировать

## 🖥 Запуск
1️⃣ Установите зависимости:
```bash
pip install aiohttp aiohttp_jinja2 jinja2
2️⃣ Запустите сервер:

bash
Копировать
Редактировать
python server.py
Приложение будет доступно на http://127.0.0.1:5000

📬 Отправка новостей
Для отправки новости используйте curl:

bash
Копировать
Редактировать
curl -X POST http://127.0.0.1:5000/news \
     -H "Content-Type: application/json" \
     -d "{\"message\": \"🔥 Срочная новость!\"}"
Или любой HTTP-клиент (Postman и т.п.)

🌐 API
GET / — главная страница с WebSocket клиентом

GET /ws — WebSocket подключение

POST /news — отправка новости в формате JSON: { "message": "ваш текст" }

GET /health — проверка здоровья сервера

⚡ Возможности
✅ Реальное время через WebSocket
✅ ping/pong для проверки соединения
✅ Статичный фронтенд с Bootstrap
✅ Простая архитектура с разделением логики

💡 Идеи для улучшения
Добавить авторизацию для отправки новостей

Сохранять новости в базе данных

Реализовать Docker для деплоя