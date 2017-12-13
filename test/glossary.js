import test from 'ava'
import request from 'supertest'
import app from '../src/app'

test('1.0 Create new glossary', async t => {
    t.plan(4)
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body
    const glossaryToCreate = { title: 'my Glossary', author: user.userId }

    const res = await request(app)
        .post('/glossary')
        .send(glossaryToCreate)

    const updatedUser = (await request(app)
        .get(`/user/${user.userId}/json`)).body;

    t.is(res.status, 200)
    t.deepEqual(res.body.title, glossaryToCreate.title)
    t.deepEqual(res.body.author.userId, glossaryToCreate.author)
    t.deepEqual(res.body.id, updatedUser.glossaries[0].id)
})


test('2.0 Fetch a glossary', async t => {
    t.plan(3)

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body



    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body


    const fetch = await request(app)
        .get(`/glossary/${glossary.glossaryId}/json`)

    t.is(fetch.status, 200)
    t.deepEqual(fetch.body.id, glossary.id)

    const renderHtml = await request(app)
        .get(`/glossary/${glossary.glossaryId}`)

    t.is(renderHtml.status, 200)
})


test('3.0 Get list of glossaries', async t => {
    t.plan(4)
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossaryToCreate = { title: 'my Glossary', author: user.userId }

    const creation = await request(app)
        .post('/glossary')
        .send(glossaryToCreate)

    const res = await request(app)
        .get('/glossary')

    t.is(res.status, 200)
    t.true(Array.isArray(res.body), 'Body should be an array')
    t.true(res.body.length > 0)

    const renderHtml = await request(app)
        .get('/glossary/all')

    t.is(renderHtml.status, 200)

});


test('4.0 Delete a glossary', async t => {
    t.plan(3)

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    const del = await request(app)
        .delete(`/glossary/${glossary.glossaryId}`)

    t.is(del.status, 200)
    t.is(del.text, 'ok!')

    const fetch = await request(app)
        .get(`/glossary/${glossary.glossaryId}/json`)

    t.is(fetch.status, 404)
})

test('5.0 Update description', async t => {

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    const newDescription = { description: 'This is the description of my glossary' }
    const updateDescription = (await request(app)
        .patch(`/glossary/${glossary.glossaryId}/description`)
        .send(newDescription))

    const updatedGlossary = (await request(app)
        .get(`/glossary/${glossary.glossaryId}/json`)).body;


    t.deepEqual(updatedGlossary.description, newDescription.description)
})


test('6.0 Enter glossary categories', async t => {
    t.plan(4)
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    const newCategories = { categories: 'philosophy, science, eastern religions' }
    const updateCategories = (await request(app)
        .patch(`/glossary/${glossary.glossaryId}/categories`)
        .send(newCategories))

    const updatedGlossary = (await request(app)
        .get(`/glossary/${glossary.glossaryId}/json`)).body;


    t.notDeepEqual(updatedGlossary.categories, newCategories.categories)
    t.deepEqual(updatedGlossary.categories[0], 'philosophy')
    t.deepEqual(updatedGlossary.categories[1], 'science')
    t.deepEqual(updatedGlossary.categories[2], 'eastern religions')
})


test('7.0 Toggle Glossary Status', async t => {
    t.plan(5)
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body

    t.deepEqual(glossary.status, 'private')

    const updateStatus = (await request(app)
        .patch(`/glossary/${glossary.glossaryId}/status`)
        .send({}))

    t.is(updateStatus.status, 200)

    const firstGlossaryUpdate = (await request(app)
        .get(`/glossary/${glossary.glossaryId}/json`)).body;

    t.deepEqual(firstGlossaryUpdate.status, 'public')

    const statusBackToPrivate = (await request(app)
        .patch(`/glossary/${glossary.glossaryId}/status`)
        .send({}))

    t.is(statusBackToPrivate.status, 200)

    const secondGlossaryUpdate = (await request(app)
        .get(`/glossary/${glossary.glossaryId}/json`)).body;

    t.deepEqual(secondGlossaryUpdate.status, 'private')
})


test('8.0 give reviews', async t => {

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body


    const newReview = { review: 'This is a review for this glossary' }
    const updateReview = (await request(app)
        .patch(`/glossary/${glossary.glossaryId}/reviews`)
        .send(newReview))

    const updatedGlossary = (await request(app)
        .get(`/glossary/${glossary.glossaryId}/json`)).body;


    t.deepEqual(updatedGlossary.reviews.reviewsList[0], newReview.review)
    t.deepEqual(updatedGlossary.reviews.total, 1)
})



test('9.0 setting rating', async t => {

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    let glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'my Glossary', author: user.userId }))
        .body


    const firstScoreAssignment = { score: 7 }
    const enterFirstRating = (await request(app)
        .patch(`/glossary/${glossary.glossaryId}/rating`)
        .send(firstScoreAssignment))

    glossary = (await request(app)
        .get(`/glossary/${glossary.glossaryId}/json`)).body;

    t.deepEqual(glossary.rating.ratingScores[0], firstScoreAssignment.score)
    t.deepEqual(glossary.rating.averageRate, 7)
    t.deepEqual(glossary.rating.median, 7)

    const secondScoreAssignment = { score: 8 }
    const enterSecondRating = (await request(app)
        .patch(`/glossary/${glossary.glossaryId}/rating`)
        .send(secondScoreAssignment))

    glossary = (await request(app)
        .get(`/glossary/${glossary.glossaryId}/json`)).body;


    t.deepEqual(glossary.rating.averageRate, 7.5)
    t.deepEqual(glossary.rating.median, 7.5)

    const thirdScoreAssignment = { score: 3 }
    const enterThirdRating = (await request(app)
        .patch(`/glossary/${glossary.glossaryId}/rating`)
        .send(thirdScoreAssignment))

    glossary = (await request(app)
        .get(`/glossary/${glossary.glossaryId}/json`)).body;


    t.deepEqual(glossary.rating.averageRate, 6)
    t.deepEqual(glossary.rating.median, 7)
})