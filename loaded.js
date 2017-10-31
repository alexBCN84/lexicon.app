const usersService = require('./services/users');
const glossariesService = require('./services/glossaries');
const entriesService = require('./services/entries');
const userModel = require('./models/user');
const glossaryModel = require('./models/glossary');
const entryModel = require('./models/entry');



// Retrieving from database and casting to new objects

const loadedData = async() => {
    const loadedUsers = await usersService.loadUser();
    const convertedUsers = loadedUsers.map(userModel.create);

    const loadedGlossaries = await glossariesService.loadGlossary();
    const convertedGlossaries = loadedGlossaries.map(glossaryModel.create);

    const loadedEntries = await entriesService.loadEntry();
    const convertedEntries = loadedEntries.map(entryModel.create);
    // list objects by property

    // list :: ([Object], String) → String
    const list = (objects, byProperty) => objects.map(object => object.print(byProperty));
    list(convertedUsers, 'name');
    list(convertedUsers, 'glossaries');
}

loadedData();





// Casting to objects to read