const util = require('./util');

module.exports = class Glossary {
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
        this.rating = [{ ratingScores: [] }, { averageRate: 0 }, { median: 0 }];
        this.reviews = [];
        this.glossaryId = util.uuid();
    }

    setDescription(description) { this.description = description; }
    setArea(area) { this.area = area; }
    setReview(review) { this.review = review; }
    setRatingAverage() {
        this.rating[1].averageRate = (this.rating[0].ratingScores.reduce((previous, current) =>
            current += previous)) / this.rating[0].ratingScores.length;
    }
    setMedian() {
        this.rating[0].ratingScores.sort((a, b) => a - b);
        let lowMiddle = Math.floor((this.rating[0].ratingScores.length - 1) / 2);
        let highMiddle = Math.ceil((this.rating[0].ratingScores.length - 1) / 2);
        this.rating[2].median = (this.rating[0].ratingScores[lowMiddle] + this.rating[0].ratingScores[highMiddle]) / 2;
    }
    setRating(score) {
        score = parseInt(score);
        if (score > 10) return console.log('INPUT ERROR: YOU NEED TO ENTER A VALUE BETWEEN 1 AND 10. RUN THIS FUNCTION AGAIN');
        this.rating[0].ratingScores = this.rating[0].ratingScores.concat(score);
        this.setRatingAverage();
        this.setMedian();
    }
};