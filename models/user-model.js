module.exports = class User {
    constructor(id, name, email, bio, location, interests = [], followers = [], skills = [], following = [], glossaries = [],
        entries = [], nOfEntries = 0, nOfGlossaries = 0, sharing = [], sharedWithMe = [], liked = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.bio = bio;
        this.location = location;
        this.interests = interests;
        this.followers = followers;
        this.skills = skills;
        this.following = following;
        this.glossaries = glossaries;
        this.entries = entries;
        this.nOfEntries = nOfEntries;
        this.nOfGlossaries = nOfGlossaries;
        this.sharing = sharing;
        this.sharedWithMe = sharedWithMe;
        this.liked = liked;
    }

    // const instance = (name, email) => new User(name, email);
    // setBio(bio) { this.bio = bio; }
    // setLocation(location) { this.location = location; }
    // setInterests(...interests) { this.interests = this.interests.concat(...interests); }
    // setSkills(...skills) { this.skills = this.skills.concat(...skills); }
    follow(followedUser) {
        this.following = this.following.concat(followedUser);
        followedUser.followers = followedUser.followers.concat(this);
    }
    shares(materialClass, materialIndex, recipient) {
        this.sharing = this.sharing.concat(materialClass[materialIndex]);
        recipient.sharedWithMe = recipient.sharedWithMe.concat(materialClass[materialIndex]);
    }
    likes(resource) {
        this.liked = this.liked.concat(resource);
        resource.likes++;
    }

    print(property) {
        console.log(this[property]);
    }
    static create(obj) {
        return new User(
            obj.id,
            obj.name,
            obj.email,
            obj.bio,
            obj.location,
            obj.interests,
            obj.followers,
            obj.skills,
            obj.following,
            obj.glossaries,
            obj.entries,
            obj.nOfEntries,
            obj.nOfGlossaries,
            obj.sharing,
            obj.sharedWithMe,
            obj.liked
        );
    }

};