const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('./database-connection')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)

const path = require('path');
// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

const glossary = require('./routes/glossary')
const user = require('./routes/user')
const entry = require('./routes/entry')
const index = require('./routes/index')

app.use('/', index)
app.use('/user', user)
app.use('/glossary', glossary)
app.use('/entry', entry)

app.get('/', (req, res, next) => {
    res.render('index')
})


app.patch('/:id', (req, res, next) => {
    res.render('index')
})


module.exports = app