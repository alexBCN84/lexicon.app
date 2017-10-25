const util = require('./util');
const users = require('./index');

module.exports = class User {
    constructor(name, email, bio, location, interests, followers, skills, following,
        glossaries, entries, nOfEntries, nOfGlossaries, sharing, sharedWithMe, liked, userId) {
        this.name = name;
        this.email = email;
        this.bio = 'edit to include your bio';
        this.location = 'edit to include your location';
        this.interests = [];
        this.followers = [];
        this.skills = [];
        this.following = [];
        this.glossaries = [];
        this.entries = [];
        this.nOfEntries = 0;
        this.nOfGlossaries = 0;
        this.sharing = [];
        this.sharedWithMe = [];
        this.liked = [];
        this.userId = util.uuid();
    }

    // const instance = (name, email) => new User(name, email);
    setBio(bio) { this.bio = bio; }
    setLocation(location) { this.location = location; }
    setInterests(...interests) { this.interests = this.interests.concat(...interests); }
    setSkills(...skills) { this.skills = this.skills.concat(...skills); }
    follows(followedUser) {
        this.following = this.following.concat(followedUser);
        followedUser.followers = this.name;
    }
    shares(materialClass, materialIndex, recipient) {
        this.sharing = this.sharing.concat(materialClass[materialIndex]);
        recipient.sharedWithMe = recipient.sharedWithMe.concat(materialClass[materialIndex]);
    }
    likes(resource) {
        this.liked = this.liked.concat(resource);
        resource.likes++;
    }
};