const util = require('./util');
const users = require('./index');

const User = class {
    constructor(name, email, bio, location, interests, followers, skills, following,
        glossaries, entries, nOfEntries, nOfGlossaries, sharedWithMe, userId) {
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
        this.sharedWithMe = [];
        this.userId = util.uuid();
    }
};

const instance = (name, email) => new User(name, email);
const setBio = bio => bio;
const setLocation = location => location;
const setInterests = (...interests) => interests;
const setSkills = (...skills) => skills;


module.exports = { instance, setBio, setLocation, setInterests, setSkills, };