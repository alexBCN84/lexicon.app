const Database = require('../data/database');
const dataUser = './data/dataUser.json';

exports.saveUser = user => Database.save(dataUser, user);
exports.loadUser = () => Database.load(dataUser);