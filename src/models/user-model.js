const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'You still haven\'t entered your bio'
    },
    location: {
        type: String,
        default: 'You still haven\'t entered a location'
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    interests: [{
        type: String,
        default: []
    }],
    skills: [{
        type: String,
        default: []
    }],
    glossaries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Glossary'
    }],
    nOfGlossaries: {
        type: Number,
        default: 0,
        ref: 'Glossary'
    },
    likes: {
        type: Number,
        default: 0,
        ref: 'User'
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
    sharing: {
        glossaries: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Glossary'
        }],
        entries: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Entry'
        }]
    },
    sharedWithMe: {
        glossaries: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Glossary'
        }],
        entries: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Entry'
        }]
    },
    liked: {
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        glossaries: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Glossary'
        }],
        entries: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Entry'
        }]
    }
})

UserSchema.plugin(AutoIncrement, { inc_field: 'userId' })


module.exports = mongoose.model('User', UserSchema)