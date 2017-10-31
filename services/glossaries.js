const Database = require('../data/database');
const dataGlossary = './data/dataGlossary.json';

exports.saveGlossary = async(glossary) => await Database.saveFile(dataGlossary, glossary);
exports.loadGlossary = async() => await Database.readFile(dataGlossary);