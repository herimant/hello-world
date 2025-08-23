from aiohttp import web
from app.routes import setup_routes
from app.ws_manager import WSManager
from app.utils import setup_logging
import aiohttp_jinja2
import jinja2
import logging

# Инициализация менеджера WebSocket соединений
ws_manager = WSManager()

def create_app():
    app = web.Application()
    setup_logging()

    aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader('templates'))
    setup_routes(app, ws_manager)

    # Добавляем статику
    app.router.add_static('/static/', path='static', name='static')

    return app

if __name__ == '__main__':
    app = create_app()
    logging.info("🚀 Запуск сервера на http://127.0.0.1:5000")
    web.run_app(app, host='127.0.0.1', port=5000)
