module.exports = class User {
    constructor(name, email, bio, location, interests, followers, skills, following,
        glossaries, entries, nOfEntries, nOfGlossaries, sharedWithMe) {
        this.name = name; // createUser
        this.email = email; // createUser
        this.bio = 'your bio is empty'; // updateBio
        this.location = 'your location is empty'; // update Location
        this.interests = []; // add interests (grab also from other user)
        this.followers = []; // follow
        this.skills = []; // add skills (grab also from other user)
        this.following = []; // follow
        this.glossaries = []; // createGlossary
        this.entries = []; // CreateEntries
        this.nOfEntries = 0; // createEntries
        this.nOfGlossaries = 0; // createGlossaries
        this.sharedWithMe = []; // share
    }
};