import test from 'ava'
import request from 'supertest'
import app from '../src/app'

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
    t.plan(3)

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }))
        .body

    const fetch = await request(app)
        .get(`/user/${user.userId}/json`)

    t.is(fetch.status, 200)

    t.deepEqual(fetch.body, user)

    const renderHtml = await request(app)
        .get(`/user/${user.userId}`)

    t.is(renderHtml.status, 200)

})


test('3.0 Get list of users', async t => {
    t.plan(4)
    const userToCreate = { name: 'Alejandro Gines', email: 'alejandro.ginesmartinez@gmail.com' }

    const creation = await request(app)
        .post('/user')
        .send(userToCreate)

    const res = await request(app)
        .get('/user')

    t.is(res.status, 200)
    t.true(Array.isArray(res.body), 'Body should be an array')
    t.true(res.body.length > 0)

    const renderHtml = await request(app)
        .get('/user/all')

    t.is(renderHtml.status, 200)
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

test('5.0 Follow other Users', async t => {
    t.plan(2)
    const user1 = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro@gmail.com' }))
        .body;

    const user2 = (await request(app)
            .post('/user')
            .send({ name: 'Ian Unger', email: 'ianUnger@gmail.com' }))
        .body;

    const followUser = (await request(app)
        .patch(`/user/${user1.userId}/following`)
        .send({ targetId: user2.userId }))

    const updatedUser1 = (await request(app)
        .get(`/user/${user1.userId}/json`)).body;

    const updatedUser2 = (await request(app)
        .get(`/user/${user2.userId}/json`)).body;

    t.deepEqual(updatedUser1.following[0].id, user2.id)
    t.deepEqual(updatedUser2.followers[0].id, user1.id)
})

test('6.0 Update interests', async t => {
    t.plan(4)
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro@gmail.com' }))
        .body;

    const newInterests = { interests: 'dancing, trainspotting, watching tv' }
    const updateInterests = (await request(app)
        .patch(`/user/${user.userId}/interests`)
        .send(newInterests))

    const updatedUser = (await request(app)
        .get(`/user/${user.userId}/json`)).body;

    t.notDeepEqual(updatedUser.interests, newInterests.interests)
    t.deepEqual(updatedUser.interests[0], 'dancing')
    t.deepEqual(updatedUser.interests[1], 'trainspotting')
    t.deepEqual(updatedUser.interests[2], 'watching tv')
})

test('7.0 Update skills', async t => {
    t.plan(3)
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro@gmail.com' }))
        .body;

    const newSkills = { skills: 'new technologies, project management' }
    const updateSkills = (await request(app)
        .patch(`/user/${user.userId}/skills`)
        .send(newSkills))

    const updatedUser = (await request(app)
        .get(`/user/${user.userId}/json`)).body;


    t.notDeepEqual(updatedUser.skills, newSkills.skills)
    t.deepEqual(updatedUser.skills[0], 'new technologies')
    t.deepEqual(updatedUser.skills[1], 'project management')

})

test('7.0 Update name', async t => {

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro@gmail.com' }))
        .body;

    const newName = { name: 'Alejandro Gines Martinez' }
    const updateName = (await request(app)
        .patch(`/user/${user.userId}/name`)
        .send(newName))

    const updatedUser = (await request(app)
        .get(`/user/${user.userId}/json`)).body;


    t.deepEqual(updatedUser.name, newName.name)

})

test('8.0 Update email', async t => {

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro@gmail.com' }))
        .body;

    const newEmail = { email: "myUpdatedEmail@gmail.com" }
    const updateEmail = (await request(app)
        .patch(`/user/${user.userId}/email`)
        .send(newEmail))

    const updatedUser = (await request(app)
        .get(`/user/${user.userId}/json`)).body;


    t.deepEqual(updatedUser.email, newEmail.email)

})

test('9.0 Update location', async t => {

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro@gmail.com' }))
        .body;

    const newLocation = { location: 'Barcelona' }
    const updateLocation = (await request(app)
        .patch(`/user/${user.userId}/location`)
        .send(newLocation))

    const updatedUser = (await request(app)
        .get(`/user/${user.userId}/json`)).body;


    t.deepEqual(updatedUser.location, newLocation.location)

})


test('10.0 Update bio', async t => {

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro@gmail.com' }))
        .body;

    const newBio = { bio: 'I was born in Barcelona in 1984' }
    const updateBio = (await request(app)
        .patch(`/user/${user.userId}/bio`)
        .send(newBio))

    const updatedUser = (await request(app)
        .get(`/user/${user.userId}/json`)).body;


    t.deepEqual(updatedUser.bio, newBio.bio)

})

test('11.0 sharing Glossaries with other users', async t => {
    t.plan(4)

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro@gmail.com' }))
        .body;

    const recipient = (await request(app)
            .post('/user')
            .send({ name: 'Ian Unger', email: 'ianUnger@gmail.com' }))
        .body;


    const withWrongGlossaryId = (await request(app)
        .patch(`/user/${user.userId}/sharing/glossaries`)
        .send({ glossaryId: 26, recipient: recipient.userId }))

    t.is(withWrongGlossaryId.status, 200)
    t.is(withWrongGlossaryId.text, 'You can only share your own glossaries')


    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'jewellery', author: user.userId }))
        .body;


    const withCorrectGlossaryId = (await request(app)
        .patch(`/user/${user.userId}/sharing/glossaries`)
        .send({ glossaryId: glossary.glossaryId, recipient: recipient.userId }))

    const updatedUser = (await request(app)
        .get(`/user/${user.userId}/json`)).body;


    t.deepEqual(updatedUser.sharing.glossaries[0].id, glossary.id)

    const updatedRecipient = (await request(app)
        .get(`/user/${recipient.userId}/json`)).body;

    t.deepEqual(updatedRecipient.sharedWithMe.glossaries[0].id, glossary.id)

})



test('12.0 sharing Entries with other users', async t => {
    t.plan(4)

    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro@gmail.com' }))
        .body;

    const recipient = (await request(app)
            .post('/user')
            .send({ name: 'Ian Unger', email: 'ianUnger@gmail.com' }))
        .body;


    const withWrongEntryId = (await request(app)
        .patch(`/user/${user.userId}/sharing/entries`)
        .send({ entryId: 26, recipient: recipient.userId }))

    t.is(withWrongEntryId.status, 200)
    t.is(withWrongEntryId.text, 'You can only share your own entries')


    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'jewellery', author: user.userId }))
        .body;

    const entry = (await request(app)
            .post('/entry')
            .send({ term: 'my term', defOrTrans: 'myDefOrTrans', author: user.userId, glossary: glossary.glossaryId }))
        .body


    const withCorrectEntryId = (await request(app)
        .patch(`/user/${user.userId}/sharing/entries`)
        .send({ entryId: entry.entryId, recipient: recipient.userId }))

    const updatedUser = (await request(app)
        .get(`/user/${user.userId}/json`)).body;


    t.deepEqual(updatedUser.sharing.entries[0].id, entry.id)

    const updatedRecipient = (await request(app)
        .get(`/user/${recipient.userId}/json`)).body;

    t.deepEqual(updatedRecipient.sharedWithMe.entries[0].id, entry.id)

})

test('13.0 user can like other users', async t => {
    t.plan(2)
    const user1 = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro@gmail.com' }))
        .body;

    const user2 = (await request(app)
            .post('/user')
            .send({ name: 'Ian Unger', email: 'ianUnger@gmail.com' }))
        .body;

    const likeOtherUser = (await request(app)
        .patch(`/user/${user1.userId}/liked/users`)
        .send({ targetUser: user2.userId }))

    const updatedUser1 = (await request(app)
        .get(`/user/${user1.userId}/json`)).body;

    t.deepEqual(user1.liked.users[0], user2.body)

    const updatedUser2 = (await request(app)
        .get(`/user/${user2.userId}/json`)).body;

    t.deepEqual(updatedUser2.likes, 1)
})


test('14.0 user can like glossaries', async t => {
    t.plan(2)
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro@gmail.com' }))
        .body;

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'jewellery', author: user.userId }))
        .body;

    const likeGlossaries = (await request(app)
        .patch(`/user/${user.userId}/liked/glossaries`)
        .send({ targetGlossary: glossary.glossaryId }))

    const updatedUser = (await request(app)
        .get(`/user/${user.userId}/json`)).body;

    t.deepEqual(user.liked.glossaries[0], glossary.body)

    const updatedGlossary = (await request(app)
        .get(`/glossary/${glossary.glossaryId}/json`)).body;

    t.deepEqual(updatedGlossary.likes, 1)
})


test('15.0 user can like entries', async t => {
    t.plan(2)
    const user = (await request(app)
            .post('/user')
            .send({ name: 'Alejandro Gines', email: 'alejandro@gmail.com' }))
        .body;

    const glossary = (await request(app)
            .post('/glossary')
            .send({ title: 'jewellery', author: user.userId }))
        .body;

    const entry = (await request(app)
            .post('/entry')
            .send({ term: 'my term', defOrTrans: 'myDefOrTrans', author: user.userId, glossary: glossary.glossaryId }))
        .body

    const likeEntries = (await request(app)
        .patch(`/user/${user.userId}/liked/entries`)
        .send({ targetEntry: entry.entryId }))

    const updatedUser = (await request(app)
        .get(`/user/${user.userId}/json`)).body;

    t.deepEqual(user.liked.entries[0], entry.body)

    const updatedEntry = (await request(app)
        .get(`/entry/${entry.entryId}/json`)).body;

    t.deepEqual(updatedEntry.likes, 1)
})