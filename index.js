const User = require('./user');
const Glossary = require('./glossary');
const Entry = require('./entry');
const Database = require('./database');


const user1 = new User('Alejandro', 'alejandro.ginesmartinez@gmail.com');
const glossary1 = new Glossary('German Food', user1, 'an extended and  detail glossary about German food', 'food');
const entry1 = new Entry('Liebkuchen', user1, 'special Christmas ginger cookies', glossary = glossary1);

const modulesArr = [user1, glossary1, entry1];
Database.save(modulesArr);

const loadedFile = Database.load();
console.log(loadedFile[0].name);