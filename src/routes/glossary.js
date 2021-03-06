const express = require('express')
const router = express.Router()

const GlossaryService = require('../services/glossary-service')
const UserService = require('../services/user-service')


router.get('/', async(req, res, next) => {
    res.send(await GlossaryService.findAll())
})

router.get('/all', async(req, res, next) => {
    const glossaries = await GlossaryService.findAll()
    res.render('glossary-list', { glossaries, title: 'Glossaries' })
})

router.get('/:id', async(req, res, next) => {
    const glossary = await GlossaryService.find(req.params.id)

    res.render('glossary-detail', { glossary, title: `${glossary.title}` })
})

router.get('/:id/json', async(req, res, next) => {
    const glossary = await GlossaryService.find(req.params.id)
    if (!glossary) res.status(404)
    res.send(glossary)
})

router.post('/', async(req, res, next) => {
    const user = await UserService.find(req.body.author)
    const glossary = await GlossaryService.add(req.body)
    user.glossaries.addToSet(glossary)
    user.nOfGlossaries++;
    await user.save()
    res.send(glossary)
})

// update description
router.patch('/:glossaryId/description', async(req, res, next) => {
    const glossary = await GlossaryService.find(req.params.glossaryId)
    glossary.description = req.body.description
    await glossary.save()
    res.send(glossary.description)
})

// update glossary categories
router.patch('/:glossaryId/categories', async(req, res, next) => {
    const glossary = await GlossaryService.find(req.params.glossaryId)
    const categories = await req.body.categories
    const categoriesArr = categories.split(', ')
    categoriesArr.map(category => glossary.categories.addToSet(category))
    await glossary.save()
    res.send(glossary.categories)
})


// toggle status
router.patch('/:glossaryId/status', async(req, res, next) => {
    const glossary = await GlossaryService.find(req.params.glossaryId)
    const status = await glossary.status
    const toggle = () => status === 'private' ? 'public' : 'private';
    glossary.status = toggle()
    await glossary.save()
    res.send(glossary.status)
})


// setting reviews
router.patch('/:glossaryId/reviews', async(req, res, next) => {
    const glossary = await GlossaryService.find(req.params.glossaryId)
    const newReview = await req.body.review
    glossary.reviews.reviewsList.addToSet(newReview)
    glossary.reviews.total++;
    await glossary.save()
    res.send(glossary.reviews)
})

// setting rating
router.patch('/:glossaryId/rating', async(req, res, next) => {
    const glossary = await GlossaryService.find(req.params.glossaryId)
    const newScore = req.body.score
    glossary.rating.ratingScores.push(newScore)
    const scores = glossary.rating.ratingScores
    const setRatingAverage = () => scores.reduce((previous, current) => current += previous) / scores.length;
    glossary.rating.averageRate = await setRatingAverage()

    const setMedian = () => {
        scores.sort((a, b) => a - b)
        const lowMiddle = Math.floor((scores.length - 1) / 2)
        const highMiddle = Math.ceil((scores.length - 1) / 2)
        const median = (scores[lowMiddle] + scores[highMiddle]) / 2
        return median
    }
    glossary.rating.median = await setMedian()

    await glossary.save()
    res.send(glossary.rating)
})

router.delete('/:id', async(req, res, next) => {
    await GlossaryService.del(req.params.id)

    res.send('ok!')
})

module.exports = router