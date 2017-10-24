const util = require('./util');

const Entry = class {
    constructor(term, defOrTrans, author, glossary, categories, likes, xShared, xCopied,
        status, relatedEntries, relatedTerms, mnemonics, entryId) {
        this.term = term; // done
        this.defOrTrans = defOrTrans; // done
        this.author = author; // done
        this.glossary = glossary; // done
        this.categories = [];
        this.likes = 0; // like
        this.xShared = 0; // share
        this.relatedEntries = [];
        this.relatedTerms = [];
        this.mnemonics = [];
        this.entryId = util.uuid();
    }
};

const instance = (term, defOrTrans, author, glossary) => new Entry(term, defOrTrans, author, glossary);

module.exports = { instance };