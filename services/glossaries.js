const Database = require('../data/database');
const dataGlossary = './dataGlossary.json';

exports.saveGlossary = glossary => Database.save(dataGlossary, glossary);
exports.loadGlossary = () => Database.load(dataGlossary);