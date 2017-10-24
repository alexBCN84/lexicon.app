const util = require('./util');

const Glossary = class {
    constructor(title, author, description, area, likes, xShared, status,
        xCopied, noOfEntries, rating, reviews, glossaryId) {
        this.title = title;
        this.author = author;
        this.description = 'edit to add description'; // describeGlossary
        this.area = area; // addLocation
        this.likes = 0; // like
        this.xShared = 0; // share
        this.entries = []; // addEntries
        this.nOfEntries = 0; // addEntries
        this.rating = rating; // rate
        this.reviews = []; // addReview
        this.glossaryId = util.uuid();
    }
};

const create = (title, author, glossaries) => new Glossary(title, author);



module.exports = { create };