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
const features = [
    [
        { feature: 'Create and share your online profile with your skills and interests.' },
        { feature: 'Look for other users, like them, follow them.' },
        { feature: 'Share your glossaries and entries with other users.' },
        { feature: 'Create your own vocabulary lists and set study sessions.' },
        { feature: 'Contribute to group projects.' },
        { feature: 'Set personal goals: how many words you want to be able to remember by the end of (day, week, month)' }

    ],
    [
        { feature: 'Create and share glossaries.' },
        { feature: 'Establish categories for your glossaries.' },
        { feature: 'Create and manage your own work group.' },
        { feature: 'See what the community things about your glossaries through their reviews and ratings.' },
        { feature: 'Review and rate other members\' glossaries and entries.' },
        { feature: 'Establish links within categories (contexts in which the word may be used)' },
        { feature: 'Enter and save your own words for review' }
    ],
    [
        { feature: 'Classify your words based on categories' },
        { feature: 'See what the community things about your glossaries through their reviews and ratings.' },
        { feature: 'Follow other users and establish links to their resources.' },
        { feature: 'Establish links to other words.' },
        { feature: 'Create and use later on your own exercises for revision.' },
        { feature: 'Create mnemonics that will help you remember the word when you\'re not sure (Establish as many connections as possible).' }
    ]
];

const glossaryFeatures = [

]

const entryFeatures = [

]

module.exports = {
    siteName,
    menu,
    motto,
    models,
    features
    // userFeatures,
    // glossaryFeatures,
    // entryFeatures
}