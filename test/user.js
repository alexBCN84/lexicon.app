import test from 'ava'
import request from 'supertest'
import app from '../app'

test('1.0 Create new user', async t => {
    const userToCreate = { name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }

    const res = await request(app)
        .post('/user')
        .send(userToCreate)

    t.is(res.status, 200)
    t.is(res.body.name, userToCreate.name)
    t.is(res.body.email, userToCreate.email)
})


test('2.0 Fetch a user', async t => {
    t.plan(2)

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const fetch = await request(app)
        .get(`/user/${user.userId}/json`)

    t.is(fetch.status, 200)
    t.deepEqual(fetch.body, user)
})


test('3.0 Get list of users', async t => {
    const userToCreate = { name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }

    const creation = await request(app)
        .post('/user')
        .send(userToCreate)

    const res = await request(app)
        .get('/user')

    t.is(res.status, 200)
    t.true(Array.isArray(res.body), 'Body should be an array')
    t.true(res.body.length > 0)
});


test('4.0 Delete a user', async t => {
    t.plan(3)

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.gines@gmail.com' }))
        .body

    const del = await request(app)
        .delete(`/user/${user.userId}`)

    t.is(del.status, 200)
    t.is(del.text, 'ok!')

    const fetch = await request(app)
        .get(`/user/${user.userId}/json`)

    t.is(fetch.status, 404)
})