const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.originalUrl === '/registro' && req.method === 'POST') {
    req.body.data = Date.now();
  } else if (req.originalUrl.match(/\/registro\/[0-9].*/) && req.method === 'PUT') {
    const parts = req.originalUrl.split('/');
    const registroCollection = router.db.get('registro').value();
    const before = registroCollection.find((k) => k.id == parts[parts.length - 1]);
    req.body.data = before['data'];
  }

  next()
});

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
});
