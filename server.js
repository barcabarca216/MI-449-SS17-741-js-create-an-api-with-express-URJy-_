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

app.delete('/todos/:slug/:id', function (request, response) {
  delete todos[request.params.slug]
  response.redirect('/todos')
})

app.put('/products/:slug/:id', function (request, response) {
  var todos = todos[request.params.slug]
  if (request.body.name !== undefined) {
    todos.name = request.body.name.trim()
  }
  if (request.body.price !== undefined) {
    todos.completed = request.params.slug
  }
  response.redirect('/todos/:id')
})

app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})
app.listen(port)
