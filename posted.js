const util = require('./util');
const usersService = require('./services/users');
const glossariesService = require('./services/glossaries');
const entriesService = require('./services/entries');


// Posting to database
usersService.saveUser(util.users);
glossariesService.saveGlossary(util.glossaries);
entriesService.saveEntry(util.entries);

const savedData = async() => {
    await usersService.saveUser(util.users);
    await glossariesService.saveGlossary(util.glossaries);
    await entriesService.saveEntry(util.entries);
}

savedData();