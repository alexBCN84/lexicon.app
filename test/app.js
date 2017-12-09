import test from 'ava'
import request from 'supertest'
import app from '../src/app'

test('1.0 render index page', async t => {
    const index = await request(app)
        .get('/')
    t.is(index.status, 200)
})


test('2.0 render user or glossary or entry', async t => {
    const indexId = await request(app)
        .patch('/:id')
    t.is(indexId.status, 200)

})