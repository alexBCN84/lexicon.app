const Database = require('../data/database');
const dataEntry = './data/dataEntry.json';

exports.saveEntry = async(entry) => await Database.saveFile(dataEntry, entry);
exports.loadEntry = async() => await Database.readFile(dataEntry);