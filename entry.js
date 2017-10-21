module.exports = class Entry {
    constructor(term, author, defOrTrans, categories, glossary, likes, xShared, xCopied,
        status, relatedEntries, relatedTerms, mnemonics) {
        this.term = term;
        this.author = author;
        this.defOrTrans = defOrTrans;
        this.glossary = glossary;
        this.categories = [];
        this.likes = 0;
        this.xShared = 0;
        this.relatedEntries = [];
        this.relatedTerms = [];
        this.mnemonics = [];
    }
};