var todos = require('./todos.js')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var port = process.env.PORT || 8080

app.get('/', function (request, response) {
  response.json({
    welcome: 'welcome to my API!'
  })
})

app.get('/todos', function (request, response) {
  response.json(todos)
})

app.get('/todos/:slug', function (request, response) {
  if (!todos[request.params.slug]) {
    response.status(404).end('This is not the todo you are looking for: ' + request.params.slug)
    return
  }
  response.json(todos[request.params.slug])
})

app.post('/todos', function (request, response) {
  var slug = request.body.name.trim().toLowerCase().split(' ').join('-')
  todos[slug] = {
    name: request.body.name.trim(),
    completed: request.body.completed.trim()
  }
  response.redirect('/todos/' + slug)
})

app.delete('/todos/:slug', function (request, response) {
  delete todos[request.params.slug]
  response.redirect('/todos')
})

app.put('/todos/:slug', function (request, response) {
  var todos = todos[request.params.slug]
  if (request.body.name !== undefined) {
    todos.name = request.body.name.trim()
  }
  if (request.body.completed !== undefined) {
    todos.completed = request.body.completed
  }
  response.redirect('/todos/' + request.params.slug)
})

app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})
app.listen(port)
