const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const EntrySchema = mongoose.Schema({
    term: {
        type: String,
        required: true
    },
    defOrTrans: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    glossary: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Glossary'
    },
    likes: {
        type: Number,
        default: 0,
        ref: 'Entry'
    },
    xShared: {
        type: Number,
        default: 0,
        ref: 'Entry'
    },
    categories: [{
        type: String,
        default: []
    }],
    status: {
        type: String,
        default: 'private'
    },
    relatedEntries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entry'
    }],
    relatedWords: [{
        type: String
    }],
    mnemonics: {
        type: String,
        default: 'Here you can write something that will help you remember this term based on memorization techniques.'
    }
})

EntrySchema.plugin(AutoIncrement, { inc_field: 'entryId' })
module.exports = mongoose.model('Entry', EntrySchema)
    // module.exports = class Entry {
    //     constructor(relatedEntries = [], relatedWords = [], mnemonics = []) {


//             this.relatedEntries = relatedEntries;
//             this.relatedWords = relatedWords;
//             this.mnemonics = mnemonics;

//         }
// setCategories(category) { this.categories = this.categories.concat(category); }
// setRelatedEntries(...relatedEntries) { this.relatedEntries = this.relatedEntries.concat(...relatedEntries); }
// setRelatedWords(...relatedWords) { this.relatedWords = this.relatedWords.concat(...relatedWords); }
// setMnemonics(...mnemonics) { this.mnemonics = this.mnemonics.concat(...mnemonics); }
// };