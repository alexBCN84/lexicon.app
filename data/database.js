const fs = require('fs');
const stringify = require('json-stringify-safe');


module.exports.save = (file, component) => fs.writeFileSync(file, stringify(component, null, 1));
module.exports.load = file => JSON.parse(fs.readFileSync(file, 'utf8'));