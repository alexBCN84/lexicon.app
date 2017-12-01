import test from 'ava'
import request from 'supertest'
import app from '../app'

test('1.0 Create new entry', async t => {
    t.plan(7)
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    const entryToCreate = { term: 'my term', defOrTrans: 'myDefOrTrans', author: user.userId, glossary: glossary.glossaryId }

    const res = await request(app)
        .post('/entry')
        .send(entryToCreate)

    const updatedUser = (await request(app)
        .get(`/user/${user.userId}/json`)).body;

    const updatedGlossary = (await request(app)
        .get(`/glossary/${glossary.glossaryId}/json`)).body;


    t.is(res.status, 200)
    t.deepEqual(res.body.term, entryToCreate.term)
    t.deepEqual(res.body.defOrTrans, entryToCreate.defOrTrans)
    t.deepEqual(res.body.author.userId, entryToCreate.author)
    t.deepEqual(res.body.glossary.glossaryId, entryToCreate.glossary)
    t.deepEqual(res.body.id, updatedUser.entries[0].id)
    t.deepEqual(res.body.id, updatedGlossary.entries[0].id)
})


test('2.0 Fetch an entry', async t => {
    t.plan(2)

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body



    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    const entry = (await request(app)
            .post('/entry')
            .send({ term: 'my term', defOrTrans: 'myDefOrTrans', author: user.userId, glossary: glossary.glossaryId }))
        .body

    const fetch = await request(app)
        .get(`/entry/${entry.entryId}/json`)

    t.is(fetch.status, 200)
    t.deepEqual(fetch.body.id, entry.id)
})


test('3.0 Get list of entries', async t => {
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    const entryToCreate = { term: 'my term', defOrTrans: 'myDefOrTrans', author: user.userId, glossary: glossary.glossaryId }

    const creation = await request(app)
        .post('/entry')
        .send(entryToCreate)

    const res = await request(app)
        .get('/entry')

    t.is(res.status, 200)
    t.true(Array.isArray(res.body), 'Body should be an array')
    t.true(res.body.length > 0)
});


test('4.0 Delete an entry', async t => {
    t.plan(3)

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    const entry = (await request(app)
            .post('/entry')
            .send({ term: 'my term', defOrTrans: 'myDefOrTrans', author: user.userId, glossary: glossary.glossaryId }))
        .body

    const del = await request(app)
        .delete(`/entry/${entry.entryId}`)

    t.is(del.status, 200)
    t.is(del.text, 'ok!')

    const fetch = await request(app)
        .get(`/entry/${entry.entryId}/json`)

    t.is(fetch.status, 404)
})

test('5.0 Enter entry categories', async t => {
    t.plan(4)
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    const entry = (await request(app)
            .post('/entry')
            .send({ term: 'my term', defOrTrans: 'myDefOrTrans', author: user.userId, glossary: glossary.glossaryId }))
        .body

    const newCategories = { categories: 'philosophy, science, eastern religions' }
    const updateCategories = (await request(app)
        .patch(`/entry/${entry.entryId}/categories`)
        .send(newCategories))

    const updatedEntry = (await request(app)
        .get(`/entry/${entry.entryId}/json`)).body;


    t.notDeepEqual(updatedEntry.categories, newCategories.categories)
    t.deepEqual(updatedEntry.categories[0], 'philosophy')
    t.deepEqual(updatedEntry.categories[1], 'science')
    t.deepEqual(updatedEntry.categories[2], 'eastern religions')
})


test('6.0 Toggle Glossary Status', async t => {
    t.plan(5)
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    const entry = (await request(app)
            .post('/entry')
            .send({ term: 'my term', defOrTrans: 'myDefOrTrans', author: user.userId, glossary: glossary.glossaryId }))
        .body

    t.deepEqual(entry.status, 'private')

    const updateStatus = (await request(app)
        .patch(`/entry/${entry.entryId}/status`)
        .send({}))

    t.is(updateStatus.status, 200)

    const firstEntryUpdate = (await request(app)
        .get(`/entry/${entry.entryId}/json`)).body;

    t.deepEqual(firstEntryUpdate.status, 'public')

    const statusBackToPrivate = (await request(app)
        .patch(`/entry/${entry.entryId}/status`)
        .send({}))

    t.is(statusBackToPrivate.status, 200)

    const secondGlossaryUpdate = (await request(app)
        .get(`/entry/${entry.entryId}/json`)).body;

    t.deepEqual(secondGlossaryUpdate.status, 'private')
})

test('7.0 Add related entries', async t => {

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    const entry = (await request(app)
            .post('/entry')
            .send({ term: 'my term', defOrTrans: 'myDefOrTrans', author: user.userId, glossary: glossary.glossaryId }))
        .body

    const relatedEntry = (await request(app)
            .post('/entry')
            .send({ term: 'my term', defOrTrans: 'myDefOrTrans', author: user.userId, glossary: glossary.glossaryId }))
        .body

    const related = { relatedEntry: relatedEntry.entryId }

    const addRelatedEntry = (await request(app)
        .patch(`/entry/${entry.entryId}/relatedEntries`)
        .send(related))

    const updatedEntry = (await request(app)
        .get(`/entry/${entry.entryId}/json`)).body;

    t.deepEqual(updatedEntry.relatedEntries[0].id, relatedEntry.id)

})


test('8.0 add related words', async t => {

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    const entry = (await request(app)
            .post('/entry')
            .send({ term: 'my term', defOrTrans: 'myDefOrTrans', author: user.userId, glossary: glossary.glossaryId }))
        .body

    const related = { relatedWord: 'magnetism' }

    const addRelatedWord = (await request(app)
        .patch(`/entry/${entry.entryId}/relatedWords`)
        .send(related))

    const updatedEntry = (await request(app)
        .get(`/entry/${entry.entryId}/json`)).body;

    t.deepEqual(updatedEntry.relatedWords[0], related.relatedWord)
})



test('9.0 mnemoncis', async t => {

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    const entry = (await request(app)
            .post('/entry')
            .send({ term: 'my term', defOrTrans: 'myDefOrTrans', author: user.userId, glossary: glossary.glossaryId }))
        .body

    const newMnemonics = { mnemonics: 'here is where I can write things that will help me remember' }

    const addMnemonics = (await request(app)
        .patch(`/entry/${entry.entryId}/mnemonics`)
        .send(newMnemonics))

    const updatedEntry = (await request(app)
        .get(`/entry/${entry.entryId}/json`)).body;

    t.deepEqual(updatedEntry.mnemonics, newMnemonics.mnemonics)
})