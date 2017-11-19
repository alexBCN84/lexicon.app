const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const GlossarySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entry'
    }],
    nOfEntries: {
        type: Number,
        default: 0,
        ref: 'Entry'
    }
})


GlossarySchema.plugin(AutoIncrement, { inc_field: 'glossaryId' })
module.exports = mongoose.model('Glossary', GlossarySchema)



// module.exports = class Glossary {
//     constructor(id, title, author, description, area, likes = 0, xShared = 0, status = 'private',
//              rating = [{ ratingScores: [] }, { averageRate: 0 }, { median: 0 }],
//             reviews = []) {
//             this.id = id;
//             this.description = description;
//             this.area = area;
//             this.likes = likes;
//             this.xShared = xShared;
//             this.status = status;
//             this.rating = rating;
//             this.reviews = reviews
//         }

//     setRatingAverage() {
//         this.rating[1].averageRate = (this.rating[0].ratingScores.reduce((previous, current) =>
//             current += previous)) / this.rating[0].ratingScores.length;
//     }
//     setMedian() {
//         this.rating[0].ratingScores.sort((a, b) => a - b);
//         let lowMiddle = Math.floor((this.rating[0].ratingScores.length - 1) / 2);
//         let highMiddle = Math.ceil((this.rating[0].ratingScores.length - 1) / 2);
//         this.rating[2].median = (this.rating[0].ratingScores[lowMiddle] + this.rating[0].ratingScores[highMiddle]) / 2;
//     }
//     setRating(score) {
//         score = parseInt(score);
//         if (score > 10) return console.log('INPUT ERROR: YOU NEED TO ENTER A VALUE BETWEEN 1 AND 10. RUN THIS FUNCTION AGAIN');
//         this.rating[0].ratingScores = this.rating[0].ratingScores.concat(score);
//         this.setRatingAverage();
//         this.setMedian();
//     }

//     print(property) {
//         console.log(this[property]);
//     }
//     static create(obj) {
//         return new Glossary(
//             obj.id,
//             obj.title,
//             obj.author,
//             obj.description,
//             obj.area,
//             obj.likes,
//             obj.xShared,
//             obj.status,
//             obj.entries,
//             obj.noOfEntries,
//             obj.rating,
//             obj.reviews
//         );
//     }
// };