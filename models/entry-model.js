const util = require('./../util');

module.exports = class Entry {
    constructor(term, defOrTrans, author, glossary, categories = [], likes = 0, xShared = 0,
        status = 'private', relatedEntries = [], relatedWords = [], mnemonics = [], entryId = util.uuid()) {
        this.term = term;
        this.defOrTrans = defOrTrans;
        this.author = author;
        this.glossary = glossary;
        this.categories = categories;
        this.likes = likes;
        this.xShared = xShared;
        this.status = status;
        this.relatedEntries = relatedEntries;
        this.relatedWords = relatedWords;
        this.mnemonics = mnemonics;
        this.entryId = entryId;
    }
    setCategories(category) { this.categories = this.categories.concat(category); }
    setRelatedEntries(...relatedEntries) { this.relatedEntries = this.relatedEntries.concat(...relatedEntries); }
    setRelatedWords(...relatedWords) { this.relatedWords = this.relatedWords.concat(...relatedWords); }
    setMnemonics(...mnemonics) { this.mnemonics = this.mnemonics.concat(...mnemonics); }

    print(property) {
        console.log(this[property]);
    }
    static create(obj) {
        return new Entry(
            obj.term,
            obj.defOrTrans,
            obj.author,
            obj.glossary,
            obj.categories,
            obj.likes,
            obj.xShared,
            obj.status,
            obj.relatedEntries,
            obj.relatedWords,
            obj.mnemonics,
            obj.entryI
        );
    }
};