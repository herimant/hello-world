import aiohttp_jinja2
from aiohttp import web
import json
import logging

@aiohttp_jinja2.template('index.html')
async def index(request):
    return {}

async def websocket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    ws_manager = request.app['ws_manager']
    await ws_manager.register(ws)

    try:
        async for msg in ws:
            if msg.type == web.WSMsgType.TEXT:
                if msg.data == 'ping':
                    await ws.send_str('pong')
                else:
                    logging.warning(f"⚠ Неожиданные данные: {msg.data}")
            elif msg.type == web.WSMsgType.ERROR:
                logging.error(f"💥 Ошибка WebSocket: {ws.exception()}")
    finally:
        await ws_manager.unregister(ws)

    return ws

async def post_news(request):
    try:
        data = await request.json()
        message = data.get('message')
        if not message:
            return web.json_response({'status': 'error', 'reason': 'No message'}, status=400)
        
        await request.app['ws_manager'].broadcast(message)
        return web.json_response({'status': 'ok'})
    except Exception as e:
        logging.exception("💥 Ошибка при обработке POST /news")
        return web.json_response({'status': 'error', 'reason': str(e)}, status=500)

async def health_check(request):
    return web.json_response({'status': 'ok'})
