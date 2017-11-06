module.exports = class Glossary {
    constructor(id, title, author, description, area, likes = 0, xShared = 0, status = 'private',
        entries = [], nOfEntries = 0, rating = [{ ratingScores: [] }, { averageRate: 0 }, { median: 0 }],
        reviews = []) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.area = area;
        this.likes = likes;
        this.xShared = xShared;
        this.status = status;
        this.entries = entries;
        this.nOfEntries = nOfEntries;
        this.rating = rating;
        this.reviews = reviews
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

    print(property) {
        console.log(this[property]);
    }
    static create(obj) {
        return new Glossary(
            obj.id,
            obj.title,
            obj.author,
            obj.description,
            obj.area,
            obj.likes,
            obj.xShared,
            obj.status,
            obj.entries,
            obj.noOfEntries,
            obj.rating,
            obj.reviews
        );
    }
};