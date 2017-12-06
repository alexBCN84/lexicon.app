const fs = require('fs')

const GlossaryModel = require('../models/glossary-model')
const UserService = require('../services/user-service')


function findAll() {
    return GlossaryModel.find()
        .populate('author')
        .populate('entries')

}

async function add(glossary) {
    glossary.author = await UserService.find(glossary.author)
    return glossary = GlossaryModel.create(glossary)

}

async function del(glossaryId) {
    return GlossaryModel.remove({ glossaryId })
}

async function find(glossaryId) {
    return GlossaryModel.findOne({ glossaryId })
        .populate('author')
        .populate('entries')
}


module.exports = {
    findAll,
    add,
    del,
    find
}