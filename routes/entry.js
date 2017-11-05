const express = require('express')
const router = express.Router()

const EntryService = require('../services/entry-service')

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
    const entry = await EntryService.add(req.body)

    res.send(entry)
})

router.delete('/:id', async(req, res, next) => {
    await EntryService.del(req.params.id)

    res.send('ok!')
})

module.exports = router