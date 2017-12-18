const express = require('express');
const router = express.Router();

const UserService = require('../services/user-service')



router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Welcome'
    });
});

router.get('/index', (req, res, next) => {
    res.render('index', {
        title: 'Home'
    });
});


module.exports = router;