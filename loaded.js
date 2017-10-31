const usersService = require('./services/users');
const glossariesService = require('./services/glossaries');
const entriesService = require('./services/entries');
const userModel = require('./models/user');
const glossaryModel = require('./models/glossary');
const entryModel = require('./models/entry');



// Retrieving from database

const loadedUsers = usersService.loadUser();
const loadedGlossaries = glossariesService.loadGlossary();
const loadedEntries = entriesService.loadEntry();

// Casting to objects to read

const convertedUsers = loadedUsers.map(userModel.create);
const convertedGlossaries = loadedGlossaries.map(glossaryModel.create);
const convertedEntries = loadedEntries.map(entryModel.create);

// list objects by property

// list :: ([Object], String) → String
const list = (objects, byProperty) => objects.map(object => object.print(byProperty));
list(convertedUsers, 'name');