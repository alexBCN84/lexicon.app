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
    }
})

EntrySchema.plugin(AutoIncrement, { inc_field: 'entryId' })
module.exports = mongoose.model('Entry', EntrySchema)
    // module.exports = class Entry {
    //     constructor(categories = [],
    //             status = 'private', relatedEntries = [], relatedWords = [], mnemonics = []) {


//             this.categories = categories;
//             this.status = status;
//             this.relatedEntries = relatedEntries;
//             this.relatedWords = relatedWords;
//             this.mnemonics = mnemonics;

//         }
// setCategories(category) { this.categories = this.categories.concat(category); }
// setRelatedEntries(...relatedEntries) { this.relatedEntries = this.relatedEntries.concat(...relatedEntries); }
// setRelatedWords(...relatedWords) { this.relatedWords = this.relatedWords.concat(...relatedWords); }
// setMnemonics(...mnemonics) { this.mnemonics = this.mnemonics.concat(...mnemonics); }

//     print(property) {
//         console.log(this[property]);
//     }
//     static create(obj) {
//         return new Entry(
//             obj.id,
//             obj.term,
//             obj.defOrTrans,
//             obj.author,
//             obj.glossary,
//             obj.categories,
//             obj.likes,
//             obj.xShared,
//             obj.status,
//             obj.relatedEntries,
//             obj.relatedWords,
//             obj.mnemonics
//         );
//     }
// };