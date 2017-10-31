const Database = require('../data/database');
const dataUser = './dataUser.json';

exports.saveUser = user => Database.save(dataUser, user);
exports.loadUser = () => Database.load(dataUser);