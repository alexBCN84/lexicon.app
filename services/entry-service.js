const fs = require('fs')

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
    const lastEntry = allEntries[allEntries.length - 1]
    const lastEntrysId = lastEntry && lastEntry.id || 0
    entry.id = lastEntrysId + 1

    entry = EntryModel.create(entry)
    allEntries.push(entry)

    await saveAll(allEntries)

    return entry
}

async function del(personId) {
    const allPeople = await findAll()
    const personIndex = allPeople.findIndex(p => p.id == personId)
    if (personIndex < 0) return

    allPeople.splice(personIndex, 1)

    saveAll(allPeople)
}

async function find(personId) {
    const allPeople = await findAll()

    return allPeople.find(p => p.id == personId)
}

function saveAll(people) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, JSON.stringify(people), (err, file) => {
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