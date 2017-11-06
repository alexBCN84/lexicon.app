const fs = require('fs')
const util = require('../util')

const EntryModel = require('../models/entry-model')

const dbPathEntry = `${__dirname}/../data/entryDatabase.json`

function findAll() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPathEntry, 'utf8', (err, file) => {
            if (err) return reject(err)

            const entries = JSON.parse(file).map(EntryModel.create)

            resolve(entries)
        })
    })
}

async function add(entry) {
    const allEntries = await findAll()
    entry.id = util.uuid()

    entry = EntryModel.create(entry)
    allEntries.push(entry)

    await saveAll(allEntries)

    return entry
}

async function del(entryId) {
    const allEntries = await findAll()
    const entryIndex = allEntries.findIndex(e => e.id == entryId)
    if (entryIndex < 0) return

    allEntries.splice(entryIndex, 1)

    saveAll(allEntries)
}

async function find(entryId) {
    const allEntries = await findAll()

    return allEntries.find(e => e.id == entryId)
}

function saveAll(entries) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPathEntry, JSON.stringify(entries), (err, file) => {
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