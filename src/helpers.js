// Some details about the site
const siteName = `LEXICON`;

const menu = [
    { slug: '/index', title: 'Home' },
    { slug: '/user/all', title: 'Users' },
    { slug: '/glossary/all', title: 'Glossaries' },
    { slug: '/entry/all', title: 'Entries' }
]

const models = menu.filter(model => model.title !== 'Home')

const motto = 'Enlarge your world by empowering your knowledge'
const userFeatures = [
    { feature: 'Create and share your online profile with your skills and interests.' },
    { feature: 'Look for other users, like them, follow them.' },
    { feature: 'Share your glossaries and entries with other users.' },
    { feature: 'Create and manage your own work group.' },
    { feature: 'Contribute to group projects.' },
    { feature: 'Review and rate other members\' glossaries and entries.' },
    { feature: 'Create your own vocabulary lists and set study sessions.' }
]

const glossaryFeatures = [
    { feature: 'Create and share your online profile with your skills and interests.' },
    { feature: 'Look for other users, like them, follow them.' },
    { feature: 'Share your glossaries and entries with other users.' },
    { feature: 'Create and manage your own work group.' },
    { feature: 'Contribute to group projects.' },
    { feature: 'Review and rate other members\' glossaries and entries.' },
    { feature: 'Create your own vocabulary lists and set study sessions.' }
]

const entryFeatures = [
    { feature: 'Create and share your online profile with your skills and interests.' },
    { feature: 'Look for other users, like them, follow them.' },
    { feature: 'Share your glossaries and entries with other users.' },
    { feature: 'Create and manage your own work group.' },
    { feature: 'Contribute to group projects.' },
    { feature: 'Review and rate other members\' glossaries and entries.' },
    { feature: 'Create your own vocabulary lists and set study sessions.' }
]

module.exports = {
    siteName,
    menu,
    motto,
    models,
    userFeatures,
    glossaryFeatures,
    entryFeatures
}