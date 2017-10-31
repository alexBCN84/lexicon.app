const User = require('./user');
const Glossary = require('./glossary');
const Entry = require('./entry');
const Database = require('./database');



// Retrieving from Database
const loadedUsers = Database.loadUser();
const loadedGlossaries = Database.loadGlossary();
const loadedEntries = Database.loadEntry();


// casting User objects back to classes
const returnedUsers = loadedUsers.map(User.create);
const names = returnedUsers.map(user => user.printName());

// casting Glossary objects back to classes
const returnedGlossaries = loadedGlossaries.map(Glossary.create);
const titles = returnedGlossaries.map(glossary => glossary.print('title'));

// casting Entries objects back to classes
const returnedEntries = loadedEntries.map(Entry.create);
const terms = returnedEntries.map(entry => entry.print('term'));