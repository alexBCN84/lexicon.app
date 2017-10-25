const User = require('./user');
const Glossary = require('./glossary');
const Entry = require('./entry');
const Database = require('./database');

// arrays for data storage
let users = [],
    glossaries = [],
    entries = [];

// global functions
const add = (arr, fn) => arr = arr.concat(fn);

const setUpGlossary = (title, author) => {
    glossaries = add(glossaries, new Glossary(title, author.name));
    author.glossaries = author.glossaries.concat(glossaries[glossaries.length - 1]);
    author.nOfGlossaries++;
};

const setUpEntries = (term, defOrTrans, author, glossary) => {
    entries = add(entries, new Entry(term, defOrTrans, author.name, glossary.title));
    author.entries = author.entries.concat(entries[entries.length - 1]);
    glossary.entries = glossary.entries.concat(entries[entries.length - 1]);
    author.nOfEntries++;
    glossary.nOfEntries++;
};

// user A can share resources with user B
const share = (sender, recipient, materialClass, materialIndex) => {
    sender.shares(materialClass, materialIndex, recipient);
    if (materialClass === glossaries) materialClass[materialIndex].xShared++;
    if (materialClass === entries) materialClass[materialIndex].xShared++;
};


// instantiating some users
users = add(users, new User('Jules Verne', 'Jules.Verne@gmail.com'));
users = add(users, new User('Marie Curie', 'Marie.Curie@gmail.com'));
users = add(users, new User('Nikola Tesla', 'nikola.tesla@gmail.com'));


// update Bios
users[0].setBio('Born in Nantes, Kingdom of France February 08, 1828; DiedMarch 24, 1905. ' +
    'GenreFiction, Science Fiction, Fantasy. InfluencesEdgar Allan Poe, Victor Hugo, Alexandre Dumas, James Fenimore Cooper, ...more. ' +
    'Jules Gabriel Verne was a French author who pioneered the genre of science-fiction. ' +
    'He is best known for his novels Journey to the Center of the Earth (1864), ' +
    'Twenty Thousand Leagues Under the Sea (1870), and Around the World in Eighty Days (1873).')


users[1].setBio('7 November 1867 – 4 July 1934; born Maria Salomea Skłodowska; [ˈmarja salɔˈmɛa skwɔˈdɔfska]' +
    'was a Polish and naturalized-French physicist and chemist who conducted pioneering research on radioactivity.' +
    'She was the first woman to win a Nobel Prize, the first person and only woman to win twice, the only person to ' +
    'win a Nobel Prize in two different sciences, and was part of the Curie family legacy of five Nobel Prizes. ' +
    'She was also the first woman to become a professor at the University of Paris, and in 1995 became the first ' +
    'woman to be entombed on her own merits in the Panthéon in Paris.');


users[2].setBio('Nikola Tesla (/ˈtɛslə/;[2] Serbian Cyrillic: Никола Тесла Serbo-Croatian pronunciation: ' +
    '[nikoːla tesla]; 10 July 1856 – 7 January 1943) was a Serbian-American[3][4][5] inventor, electrical engineer,' +
    'mechanical engineer, physicist, and futurist who is best known for his contributions to the design of the' +
    'modern alternating current (AC) electricity supply system.');


// // update users' location
users[0].setLocation('Nantes (France) - Amiens (France)');
users[1].setLocation('Warsaw (Poland) - Passy (France)');
users[2].setLocation('Austrian Empire) - New York (USA)');

// add interests to interests array
users[0].setInterests('literature', 'science');

// copy interests from another user
users[1].setInterests(users[0].interests[0]);

// // follow users and being followed 
users[0].follows(users[1]);
users[0].follows(users[2]);
users[1].follows(users[2]);
users[1].follows(users[0]);

// add skills to skills array
users[0].setSkills('physics', 'writing');

// copy skills from another user
users[1].setSkills(users[0].skills);


// instantiating some glossaries and linking them to author
setUpGlossary('Jules Verne\'s famous quotes', users[0]);
setUpGlossary('Marie Curie\'s famous quotes', users[1]);
setUpGlossary('Nikola Tesla\'s famous quotes', users[2]);

// update glossary's description
glossaries[0].setDescription('This glossary is devoted to collect famous and inspiring quotes from Jules Verne');

// update area of knwoledge under which glossaries are classified

glossaries[0].setArea('Philosophy of life, inspirational quotes.');

// instantiate some entries
setUpEntries('Man is never perfect nor contented.',
    'El ser humano nunca es perfecto ni tampoco está satisfecho',
    users[0], glossaries[0]);

setUpEntries('I believe cats to be spirits come to earth. A cat, I am sure, could walk on a cloud without coming through.',
    'Creo que los gatos son espíritus llegagos a la Tierra. Estoy seguro de que un gato podría andar sobre una nube sin colarse a través de ella',
    users[0], glossaries[0]);

setUpEntries('I was taught that the way of progress was neither swift nor easy. ',
    'Me enseñaron que el camino del progreso no era rápido ni fácil.',
    users[1], glossaries[1]);

setUpEntries('I am among those who think that science has great beauty.',
    'Estoy entre aquellos que piensan que la ciencia tiene una gran belleza.',
    users[1], glossaries[1]);


setUpEntries('Our virtues and our failings are inseparable, like force and matter. When they separate, man is no more.',
    'Nuestras virtudes y nuestras fallas son inseparables, como la fuerza y ​​la materia. Cuando se separan, el hombre ya no existe.',
    users[2], glossaries[2]);

setUpEntries('In the twenty-first century, the robot will take the place which slave labor occupied in ancient civilization.',
    'En el siglo XXI, el robot tomará el lugar que el trabajo esclavo ocupó en la civilización antigua.',
    users[2], glossaries[2]);

// share entry with other users
share(users[0], users[2], entries, 1);

// share a glossary with others
share(users[0], users[2], glossaries, 0);
// review glossaries
glossaries[0].setReview('excellent and inspirational');
glossaries[1].setReview('a must to have.');

// set categories for entries
entries[0].setCategories('human debilities');

// liking glossaries
users[0].likes(glossaries[0]);
users[0].likes(glossaries[0]);
users[0].likes(glossaries[0]);
users[1].likes(glossaries[0]);
users[1].likes(glossaries[0]);
users[0].likes(glossaries[0]);
users[2].likes(glossaries[0]);

// liking entries
users[0].likes(entries[0]);
users[0].likes(entries[0]);
users[0].likes(entries[0]);
users[1].likes(entries[0]);
users[1].likes(entries[1]);
users[0].likes(entries[1]);
users[2].likes(entries[0]);

// enter a rating for a glossary
glossaries[0].setRating(3);
glossaries[0].setRating(5);
glossaries[0].setRating(9);
glossaries[0].setRating(10);

// enter related entries to this one

entries[0].setRelatedEntries(entries[1], entries[2]);

// relatedWords here
entries[0].setRelatedWords('relatedWord1', 'relatedWord2');

// enter trick to help you remember a word or expression
entries[0].setMnemonics('my mnemonics technique');

// Database storing and retrieving
Database.saveUser(users);
const loadFileUsers = Database.loadUser();
console.log('Users: ' + JSON.stringify(loadFileUsers));

Database.saveGlossary(glossaries);
const loadFileGlossaries = Database.loadGlossary();
// console.log('Glossaries: ' + JSON.stringify(loadFileGlossaries));

Database.saveEntry(entries);
const loadFileEntries = Database.loadEntry();
// console.log('Entries: ' + JSON.stringify(loadFileEntries));