const util = require('./util');

const Glossary = class {
    constructor(title, author, description, area, likes, xShared, status,
        xCopied, noOfEntries, rating, reviews, glossaryId) {
        this.title = title;
        this.author = author;
        this.description = 'edit to add description';
        this.area = area;
        this.likes = 0;
        this.xShared = 0;
        this.entries = [];
        this.nOfEntries = 0;
        this.rating = rating; // rate
        this.reviews = [];
        this.glossaryId = util.uuid();
    }
};

const instance = (title, author, glossaries) => new Glossary(title, author);
const setDescription = description => description;
const setArea = area => area;
const setReview = review => review;


module.exports = { instance, setDescription, setArea, setReview };