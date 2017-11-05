const fs = require('fs')

const GlossaryModel = require('../models/glossary-model')

const dbPathGlossary = `${__dirname}/../data/glossaryDatabase.json`

function findAll() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPathGlossary, 'utf8', (err, file) => {
            if (err) return reject(err)

            const glossaries = JSON.parse(file).map(GlossaryModel.create)

            resolve(glossaries)
        })
    })
}

async function add(glossary) {
    const allGlossaries = await findAll()
    const lastGlossary = allGlossaries[allGlossaries.length - 1]
    const lastGlossarysId = lastGlossary && lastGlossary.id || 0
    glossary.id = lastGlossarysId + 1

    glossary = GlossaryModel.create(glossary)
    allGlossaries.push(glossary)

    await saveAll(allGlossaries)

    return glossary
}

async function del(glossaryId) {
    const allGlossaries = await findAll()
    const glossaryIndex = allGlossaries.findIndex(g => g.id == glossaryId)
    if (glossaryIndex < 0) return

    allGlossaries.splice(glossaryIndex, 1)

    saveAll(allGlossaries)
}

async function find(glossaryId) {
    const allGlossaries = await findAll()

    return allGlossaries.find(g => g.id == glossaryId)
}

function saveAll(glossaries) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPathGlossary, JSON.stringify(glossaries), (err, file) => {
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