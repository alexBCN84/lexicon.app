// const posted = require('./posted');
// const loaded = require('./loaded');


const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.set('view engine', 'pug')

const user = require('./routes/user')
const glossary = require('./routes/glossary')
const entry = require('./routes/entry')

app.use('/user', user)
app.use('/glossary', glossary)
app.use('/entry', entry)

app.get('/', (req, res, next) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log('Server listening.')
})