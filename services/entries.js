const Database = require('../data/database');
const dataEntry = './data/dataEntry.json';

exports.saveEntry = entry => Database.save(dataEntry, entry);
exports.loadEntry = () => Database.load(dataEntry);