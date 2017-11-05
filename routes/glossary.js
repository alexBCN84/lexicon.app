const express = require('express')
const router = express.Router()

const GlossaryService = require('../services/glossary-service')

router.get('/', async(req, res, next) => {
    res.send(await GlossaryService.findAll())
})

router.get('/all', async(req, res, next) => {
    const glossaries = await GlossaryService.findAll()
    res.render('glossary-list', { glossaries })
})

router.get('/:id', async(req, res, next) => {
    const glossary = await GlossaryService.find(req.params.id)

    res.render('glossary-detail', { glossary })
})

router.post('/', async(req, res, next) => {
    const glossary = await GlossaryService.add(req.body)

    res.send(glossary)
})

router.delete('/:id', async(req, res, next) => {
    await GlossaryService.del(req.params.id)

    res.send('ok!')
})

module.exports = router