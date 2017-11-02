const Database = require('../data/database');
const dataEntry = './data/dataEntry.json';

exports.saveEntry = entry => Database.saveFile(dataEntry, entry);
exports.loadEntry = () => Database.readFile(dataEntry);