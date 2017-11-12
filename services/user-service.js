const fs = require('fs')

const UserModel = require('../models/user-model')
const util = require('../util')

function findAll() {
    return UserModel.find()
        .populate('followers')
        .populate('following')
}

async function add(user) {
    return user = UserModel.create(user)
}

async function del(id) {
    return UserModel.remove({ id })
}

async function find(id) {
    return UserModel.findOne({ id })
        .populate('followers')
        .populate('following')
}

module.exports = {
    findAll,
    find,
    add,
    del
}