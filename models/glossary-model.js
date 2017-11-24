const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const GlossarySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entry'
    }],
    nOfEntries: {
        type: Number,
        default: 0,
        ref: 'Entry'
    },
    likes: {
        type: Number,
        default: 0,
        ref: 'Glossary'
    },
    description: {
        type: String,
        default: 'You haven\'t entered a description yet'
    },
    xShared: {
        type: Number,
        default: 0,
        ref: 'Glossary'
    },
    categories: [{
        type: String,
        default: []
    }],
    status: {
        type: String,
        default: 'private'
    },
    reviews: {
        total: {
            type: Number,
            default: 0
        },
        reviewsList: [{
            type: String,
            default: 'no reviews'
        }]
    },
    rating: {
        ratingScores: [{
            type: Number,
            max: 10,
            min: 1

        }],
        averageRate: {
            type: Number,
            default: 0
        },
        median: {
            type: Number,
            default: 0
        }
    }
})


GlossarySchema.plugin(AutoIncrement, { inc_field: 'glossaryId' })
module.exports = mongoose.model('Glossary', GlossarySchema)