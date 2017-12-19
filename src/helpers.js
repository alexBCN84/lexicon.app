// Some details about the site
exports.siteName = `LEXICON`;

const menu = [
    { slug: '/index', title: 'Home' },
    { slug: '/user/all', title: 'Users' },
    { slug: '/glossary/all', title: 'Glossaries' },
    { slug: '/entry/all', title: 'Entries' }
]

const models = menu.filter(model => model.title !== 'Home')

module.exports = { menu, models }