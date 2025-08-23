from app.views import index, websocket_handler, post_news, health_check

def setup_routes(app, ws_manager):
    app['ws_manager'] = ws_manager
    app.router.add_get('/', index)
    app.router.add_get('/ws', websocket_handler)
    app.router.add_post('/news', post_news)
    app.router.add_get('/health', health_check)
