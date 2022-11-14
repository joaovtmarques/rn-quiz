const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middleware = jsonServer.defaults()

server.use(middleware)
server.use(jsonServer.bodyParser)


server.put('/quiz/:id/complete', (req, res, next) => {
  const id = req.params.id
  const { gotItRight, time } = req.body

  const result = router.db.get('quiz').value()
  const quiz = result.find(q => q.id == id)

  quiz.completed = true

  if (gotItRight) {
    const userScore = (100 - (time <= 2 ? 0 : time * 1.5)) / 100 * quiz.maxScore
    quiz.userScore = userScore > 0 ? userScore : 0

  } else {
    quiz.userScore = 0
  }

  req.body = quiz
  return res.json(quiz)
});

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
});
