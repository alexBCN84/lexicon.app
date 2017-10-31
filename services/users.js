const Database = require('../data/database');
const dataUser = './data/dataUser.json';

exports.saveUser = async(user) => await Database.saveFile(dataUser, user);
exports.loadUser = async() => await Database.readFile(dataUser);