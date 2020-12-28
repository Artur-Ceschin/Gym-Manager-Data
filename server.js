const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');

const server = express();

server.use(express.static('public'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('views', { 
    express: server,
    autoescape:false,
    noCache: true,
})

const port = 8080
server.listen(port, ()=> {
    console.log('Server is running on port ' + port)
})