module.exports = class Glossary {
    constructor(title, author, description, area, likes, xShared, status,
        xCopied, noOfEntries, rating, reviews) {
        this.title = title; // createGlossary
        this.author = author; // createGlossary
        this.description = description; // describeGlossary
        this.area = area; // updateLocation
        this.likes = 0; // like
        this.xShared = 0; // share
        this.entries = []; // createEntries
        this.nOfEntries = 0; // createEntries
        this.rating = rating; // rate
        this.reviews = []; // addReview
    }
};