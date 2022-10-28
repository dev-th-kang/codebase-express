const express = require('express')
const db = require('./src/config/db')
const bodyParser = require('body-parser')
const session = require('express-session')
const route = require('./src/routes/index')
const passport = require('passport')
const server = express()
require('dotenv').config()
require('./src/middleware/passport')

const SERVER_PORT = process.env.SERVER_PORT
server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

server.use(passport.initialize());
server.use(passport.session());

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))
server.use('/',route)

db.connect((err)=>{ 
    if(err) throw err;
    else console.log('db CONNECT .. !')
});

server.listen(SERVER_PORT,()=>console.log(`SERVER http://localhost:${SERVER_PORT} OPEN .. !`))