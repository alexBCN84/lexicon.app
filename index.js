const User = require('./user');
const Glossary = require('./glossary');
const Entry = require('./entry');
const Database = require('./database');

const instructions = `
WELCOME TO LEXICON!
------------------

Here are a few functions used to operate the app:

1. SeeInstructions() -> run this whenever you want to read this instructions again.
`;


// core functions

const map = fn => arr => arr.map(fn);
const filter = fn => arr => arr.filter(fn);

// managing the database
const save = data => Database.save(data);
// const loadedFile = Database.load();
// console.log(loadedFile[0].name);

// global functionality
const render = data => console.log(data);
const seeInstructions = render(instructions);

const Alex = new User('Alejandro', 'alejandro.ginesmartinez@gmail.com');
save(Alex);
// const createUser = name =

// const display = render(loadedFile);