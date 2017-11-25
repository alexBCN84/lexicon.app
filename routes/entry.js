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

// update entry categories
router.patch('/:entryId/categories', async(req, res, next) => {
    const entry = await EntryService.find(req.params.entryId)
    const categories = await req.body.categories
    const categoriesArr = categories.split(', ')
    categoriesArr.map(category => entry.categories.addToSet(category))
    await entry.save()
    res.send(entry.categories)
})


// toggle status
router.patch('/:entryId/status', async(req, res, next) => {
    const entry = await EntryService.find(req.params.entryId)
    const status = await entry.status
    const toggle = () => status === 'private' ? 'public' : 'private';
    entry.status = toggle()
    await entry.save()
    res.send(entry.status)
})

// add related entries
router.patch('/:entryId/relatedEntries', async(req, res, next) => {
    const entry = await EntryService.find(req.params.entryId)
    const relatedEntry = await EntryService.find(req.body.relatedEntry)
    entry.relatedEntries.addToSet(relatedEntry)
    await entry.save()
    res.send(entry.relatedEntries)
})

// add relatedWords
router.patch('/:entryId/relatedWords', async(req, res, next) => {
    const entry = await EntryService.find(req.params.entryId)
    const relatedWord = req.body.relatedWord
    entry.relatedWords.addToSet(relatedWord)
    await entry.save()
    res.send(entry.relatedWords)
})

// enter your mnemonics
router.patch('/:entryId/mnemonics', async(req, res, next) => {
    const entry = await EntryService.find(req.params.entryId)
    const mnemonics = req.body.mnemonics
    entry.mnemonics = mnemonics
    await entry.save()
    res.send(entry.mnemonics)
})

router.delete('/:id', async(req, res, next) => {
    await EntryService.del(req.params.id)

    res.send('ok!')
})

module.exports = router