const fs = require('fs');
const stringify = require('json-stringify-safe');

module.exports.saveFile = (filename, component) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, stringify(component, null, 1), (err, contents) => {
            if (err) return reject(err);

            resolve(contents);
        })
    })
};


module.exports.readFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, contents) => {
            if (err) return reject(err);

            resolve(JSON.parse(contents));
        })
    })
};