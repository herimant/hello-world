import asyncio
import logging

class WSManager:
    def __init__(self):
        self.clients = set()

    async def register(self, ws):
        logging.info("🔌 Новый клиент подключился")
        self.clients.add(ws)

    async def unregister(self, ws):
        logging.info("❌ Клиент отключился")
        self.clients.discard(ws)

    async def broadcast(self, message):
        logging.info(f"📢 Рассылаем сообщение: {message}")
        if self.clients:
            await asyncio.gather(*[ws.send_str(message) for ws in self.clients])
