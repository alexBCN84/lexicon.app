const fs = require('fs')

const UserModel = require('../models/user-model')



function findAll() {
    return UserModel.find()
        .populate('followers')
        .populate('following')
        .populate('glossaries')
        .populate('entries')
        .populate('sharing.glossaries')
        .populate('sharing.entries')
        .populate('sharedWithMe.glossaries')
        .populate('sharedWithMe.entries')
        .populate('liked.users')
        .populate('liked.glossaries')
        .populate('liked.entries')
}

async function add(user) {
    return user = UserModel.create(user)
}

async function del(userId) {
    // if you don't return you have to put .exec() at the end
    return UserModel.remove({ userId })
}


async function find(userId) {
    return UserModel.findOne({ userId })
        .populate('followers')
        .populate('following')
        .populate('glossaries')
        .populate('entries')
        .populate('sharing.glossaries')
        .populate('sharing.entries')
        .populate('sharedWithMe.glossaries')
        .populate('sharedWithMe.entries')
        .populate('liked.users')
        .populate('liked.glossaries')
        .populate('liked.entries')
}

module.exports = {
    findAll,
    find,
    add,
    del
}