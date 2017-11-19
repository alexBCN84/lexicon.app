const express = require('express')
const router = express.Router()

const UserService = require('../services/user-service')
const GlossaryService = require('../services/glossary-service')
const EntryService = require('../services/entry-service')

router.get('/', async(req, res, next) => {
    res.send(await UserService.findAll())
})

router.get('/all', async(req, res, next) => {
    const users = await UserService.findAll()
    res.render('user-list', { users })
})

router.get('/:id', async(req, res, next) => {
    const user = await UserService.find(req.params.id)
    res.render('user-detail', { user })
})


router.post('/', async(req, res, next) => {
    const user = await UserService.add(req.body)
    res.send(user)
})

router.patch('/:userId/following', async(req, res, next) => {
    const user = await UserService.find(req.params.userId)
    const target = await UserService.find(req.body.targetId)
    user.following.addToSet(target)
    target.followers.addToSet(user)
    await target.save()
    const updatedUser = await user.save()
    res.send(updatedUser)
})

// update interests
router.patch('/:userId/interests', async(req, res, next) => {
    const user = await UserService.find(req.params.userId)
    const newInterests = await req.body.interests
    const interestsArr = newInterests.split(', ')
    interestsArr.map(interest => user.interests.addToSet(interest))
    await user.save()
    res.send(user.interests)
})


// update skills
router.patch('/:userId/skills', async(req, res, next) => {
    const user = await UserService.find(req.params.userId)
    const newSkills = await req.body.skills
    const skillsArr = newSkills.split(', ')
    skillsArr.map(skill => user.skills.addToSet(skill))
    await user.save()
    res.send(user.skills)

})

// update name
router.patch('/:userId/name', async(req, res, next) => {
    const user = await UserService.find(req.params.userId)

    user.name = req.body.name
    await user.save()
    res.send(user.name)
})

// update email
router.patch('/:userId/email', async(req, res, next) => {
    const user = await UserService.find(req.params.userId)

    user.email = req.body.email
    await user.save()
    res.send(user.email)
})

// update location
router.patch('/:userId/location', async(req, res, next) => {
    const user = await UserService.find(req.params.userId)

    user.location = req.body.location
    await user.save()
    res.send(user.location)
})

// update bio
router.patch('/:userId/bio', async(req, res, next) => {
    const user = await UserService.find(req.params.userId)

    user.bio = req.body.bio
    await user.save()
    res.send(user.bio)
})

router.patch('/:userId/sharing/glossaries', async(req, res, next) => {
    const user = await UserService.find(req.params.userId)
    const id = await req.body.glossaryId
    const recipient = await UserService.find(req.body.recipient)

    const userGlossaries = user.glossaries.filter(glossary => {
        return glossary.glossaryId === id
    })

    if (userGlossaries.length === 0) {
        res.send('You can only share your own glossaries')
    } else {
        const glossaryShared = await GlossaryService.find(id)
        user.sharing.glossaries.addToSet(glossaryShared)
        user.save()
        recipient.sharedWithMe.glossaries.addToSet(glossaryShared)
        recipient.save()
        res.send(recipient)
    }
})
router.patch('/:userId/sharing/entries', async(req, res, next) => {
    const user = await UserService.find(req.params.userId)
    const id = await req.body.entryId
    const recipient = await UserService.find(req.body.recipient)

    const userEntries = user.entries.filter(entry => {
        return entry.entryId === id
    })

    if (userEntries.length === 0) {
        res.send('You can only share your own glossaries')
    } else {
        const entryShared = await EntryService.find(id)
        user.sharing.entries.addToSet(entryShared)
        user.save()
        recipient.sharedWithMe.entries.addToSet(entryShared)
        recipient.save()
        res.send(recipient)
    }


})

router.delete('/:userId', async(req, res, next) => {
    await UserService.del(req.params.userId)

    res.send('ok!')
})



module.exports = router