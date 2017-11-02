const Database = require('../data/database');
const dataGlossary = './data/dataGlossary.json';

exports.saveGlossary = glossary => Database.saveFile(dataGlossary, glossary);
exports.loadGlossary = () => Database.readFile(dataGlossary);