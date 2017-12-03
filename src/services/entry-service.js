const fs = require('fs')

const EntryModel = require('../models/entry-model')
const GlossaryService = require('../services/glossary-service')
const EntryService = require('../services/entry-service')
const UserService = require('../services/user-service')

function findAll() {
    return EntryModel.find()
        .populate('author')
        .populate('glossary')
        .populate('relatedEntries')
}

async function add(entry) {
    entry.author = await UserService.find(entry.author)
    entry.glossary = await GlossaryService.find(entry.glossary)
    return entry = EntryModel.create(entry)
}

async function del(entryId) {
    return EntryModel.remove({ entryId })
}

async function find(entryId) {
    return EntryModel.findOne({ entryId })
        .populate('author')
        .populate('glossary')
        .populate('relatedEntries')
}

module.exports = {
    findAll,
    find,
    add,
    del
}