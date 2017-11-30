import test from 'ava'
import request from 'supertest'
import app from '../app'

test('1.0 Create new glossary', async t => {
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body
    const glossaryToCreate = { title: 'my Glossary', author: user.userId }

    const res = await request(app)
        .post('/glossary')
        .send(glossaryToCreate)

    t.is(res.status, 200)
    t.is(res.body.author, glossaryToCreate.title)
    t.is(res.body.author, glossaryToCreate.author)
})