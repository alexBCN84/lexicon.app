const fs = require('fs');
const stringify = require('json-stringify-safe');

save = (file, component) => fs.writeFileSync(file, stringify(component));
load = file => JSON.parse(fs.readFileSync(file, 'utf8'));

const dataUser = './dataUser.json';
exports.saveUser = user => save(dataUser, user);
exports.loadUser = () => JSON.parse(fs.readFileSync(dataUser, 'utf8'));

const dataGlossary = './dataGlossary.json';
exports.saveGlossary = glossary => save(dataGlossary, glossary);
exports.loadGlossary = () => JSON.parse(fs.readFileSync(dataGlossary, 'utf8'));

const dataEntry = './dataEntry.json';
exports.saveEntry = entry => save(dataEntry, entry);
exports.loadEntry = () => JSON.parse(fs.readFileSync(dataEntry, 'utf8'));