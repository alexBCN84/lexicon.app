const express = require('express')
const router = express.Router()

const EntryService = require('../services/entry-service')
const UserService = require('../services/user-service')
const GlossaryService = require('../services/glossary-service')

router.get('/', async(req, res, next) => {
    res.send(await EntryService.findAll())
})

router.get('/all', async(req, res, next) => {
    const entries = await EntryService.findAll()
    res.render('entry-list', { entries })
})

router.get('/:id', async(req, res, next) => {
    const entry = await EntryService.find(req.params.id)

    res.render('entry-detail', { entry })
})

router.post('/', async(req, res, next) => {
    const user = await UserService.find(req.body.author)
    const glossary = await GlossaryService.find(req.body.glossary)
    const entry = await EntryService.add(req.body)
    user.entries.addToSet(entry)
    glossary.entries.addToSet(entry)
    user.nOfEntries++;
    glossary.nOfEntries++;
    await user.save()
    await glossary.save()
    res.send(entry)
})

router.delete('/:id', async(req, res, next) => {
    await EntryService.del(req.params.id)

    res.send('ok!')
})

module.exports = router