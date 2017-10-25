const util = require('./util');

module.exports = class Entry {
    constructor(term, defOrTrans, author, glossary, categories, likes, xShared, xCopied,
        status, relatedEntries, relatedTerms, mnemonics, entryId) {
        this.term = term;
        this.defOrTrans = defOrTrans;
        this.author = author;
        this.glossary = glossary;
        this.categories = [];
        this.likes = 0;
        this.xShared = 0;
        this.relatedEntries = []; // missing
        this.relatedTerms = []; // missing
        this.mnemonics = []; // missing
        this.entryId = util.uuid();
    }
    setCategories(category) { this.categories = this.categories.concat(category); }
};