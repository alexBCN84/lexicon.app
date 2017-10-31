const Database = require('../data/database');
const dataGlossary = './data/dataGlossary.json';

exports.saveGlossary = glossary => Database.save(dataGlossary, glossary);
exports.loadGlossary = () => Database.load(dataGlossary);