const util = require('./util');
const usersService = require('./services/users');
const glossariesService = require('./services/glossaries');
const entriesService = require('./services/entries');


// Posting to database

// Posting to database
usersService.saveUser(util.users);
glossariesService.saveGlossary(util.glossaries);
entriesService.saveEntry(util.entries);