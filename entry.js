const util = require('./util');

const Entry = class {
    constructor(term, defOrTrans, author, glossary, categories, likes, xShared, xCopied,
        status, relatedEntries, relatedTerms, mnemonics, entryId) {
        this.term = term;
        this.defOrTrans = defOrTrans;
        this.author = author;
        this.glossary = glossary;
        this.categories = []; // missimg
        this.likes = 0;
        this.xShared = 0;
        this.relatedEntries = []; // missing
        this.relatedTerms = []; // missing
        this.mnemonics = []; // missing
        this.entryId = util.uuid();
    }
};

const instance = (term, defOrTrans, author, glossary) => new Entry(term, defOrTrans, author, glossary);
const setCategories = category => category;

module.exports = { instance, setCategories };