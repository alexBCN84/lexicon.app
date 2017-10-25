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
        this.relatedEntries = [];
        this.relatedWords = [];
        this.mnemonics = [];
        this.entryId = util.uuid();
    }
    setCategories(category) { this.categories = this.categories.concat(category); }
    setRelatedEntries(...relatedEntries) { this.relatedEntries = this.relatedEntries.concat(...relatedEntries); }
    setRelatedWords(...relatedWords) { this.relatedWords = this.relatedWords.concat(...relatedWords); }
    setMnemonics(...mnemonics) { this.mnemonics = this.mnemonics.concat(...mnemonics); }
};