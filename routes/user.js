const express = require('express')
const router = express.Router()

const UserService = require('../services/user-service')

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

router.post('/:userId/following', async(req, res, next) => {
    const user = await UserService.find(req.params.userId)
    const target = await UserService.find(req.body.targetId)

    user.following.addToSet(target)
    target.followers.addToSet(user)
    await target.save()
    const updatedUser = await user.save()
    res.send(updatedUser)
})

router.delete('/:id', async(req, res, next) => {
    await UserService.del(req.params.id)
    res.send('ok!')
})




module.exports = router