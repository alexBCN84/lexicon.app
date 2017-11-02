const fs = require('fs');
const stringify = require('json-stringify-safe');


module.exports.saveFile = (file, component) => fs.writeFileSync(file, stringify(component, null, 1));
module.exports.readFile = file => JSON.parse(fs.readFileSync(file, 'utf8'));