const fs = require('fs')

const UserModel = require('../models/user-model')

const dbPathUser = `${__dirname}/../data/userDatabase.json`


// promise to read data from the database
function findAll() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPathUser, 'utf8', (err, file) => {
            if (err) return reject(err)

            const users = JSON.parse(file).map(UserModel.create)

            resolve(users)
        })
    })
}

async function add(user) {
    const allUsers = await findAll()
    const lastUser = allUsers[allUsers.length - 1]
    const lastUsersId = lastUser && lastUser.id || 0
    user.id = lastUsersId + 1

    user = UserModel.create(user)
    allUsers.push(user)

    await saveAll(allUsers)

    return user
}

async function del(userId) {
    const allUsers = await findAll()
    const userIndex = allUsers.findIndex(u => u.id == userId)
    if (userIndex < 0) return

    allUsers.splice(userIndex, 1)

    saveAll(allUsers)
}

async function find(userId) {
    const allUsers = await findAll()

    return allUsers.find(u => u.id == userId)
}


// promise to write data to the database
function saveAll(users) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPathUser, JSON.stringify(users), (err, file) => {
            if (err) return reject(err)

            resolve()
        })
    })
}

module.exports = {
    findAll,
    find,
    add,
    del
}