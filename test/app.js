import test from 'ava'
import request from 'supertest'
import app from '../src/app'

test('1.0 render index page', async t => {
    const index = await request(app)
        .get('/')

    const indexPage = `<html><head><title>LEXICON APP</title><script src="https://unpkg.com/axios@0.17.0/dist/axios.min.js"></script><style>body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }</style><script>console.log('hello there 👋')
</script></head><body><h1>Welcome to Lexicon</h1></body></html>`
    t.is(index.status, 200)
    t.is(index.text, indexPage)
})


test('2.0 render user or glossary or entry', async t => {
    const indexId = await request(app)
        .patch('/:id')

    const indexPage = `<html><head><title>LEXICON APP</title><script src="https://unpkg.com/axios@0.17.0/dist/axios.min.js"></script><style>body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }</style><script>console.log('hello there 👋')
</script></head><body><h1>Welcome to Lexicon</h1></body></html>`
    t.is(indexId.status, 200)
    t.is(indexId.text, indexPage)
})