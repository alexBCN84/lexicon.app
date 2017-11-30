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
        // t.is(res.body.author, glossaryToCreate.author)
})


// test('2.0 Fetch a glossary', async t => {
//     t.plan(2)

//     const glossary = (await request(app)
//             .post('/glossary')
//             .send({ title: 'myGlossary', author: user.userId }))
//         .body

//     const fetch = await request(app)
//         .get(`/glossary/${glossary.glossaryId}/json`)

//     t.is(fetch.status, 200)
//     t.deepEqual(fetch.body, glossary)
// })


// test('3.0 Get list of glossaries', async t => {
//     const glossaryToCreate = { title: 'my Glossary', author: user.userId }

//     const creation = await request(app)
//         .post('/glossary')
//         .send(glossaryToCreate)

//     const res = await request(app)
//         .get('/glossary')

//     t.is(res.status, 200)
//     t.true(Array.isArray(res.body), 'Body should be an array')
//     t.true(res.body.length > 0)
// });


// test('4.0 Delete a glossary', async t => {
//     t.plan(3)

//     const glossary = (await request(app)
//             .post('/glossary')
//             .send({ title: 'my Glossary', author: user.userId }))
//         .body

//     const del = await request(app)
//         .delete(`/glossary/${glossary.glossaryId}`)

//     t.is(del.status, 200)
//     t.is(del.text, 'ok!')

//     const fetch = await request(app)
//         .get(`/glossary/${glossary.glossaryId}/json`)

//     t.is(fetch.status, 404)
// })