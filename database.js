// I will create functions save and load here
const fs = require('fs'); // fs is the short for file system
module.exports.save = people => {
    fs.writeFileSync('./data.json', JSON.stringify(people));
    console.log(people);
};

module.exports.load = () => {
    return JSON.parse(fs.readFileSync('./data.json', 'utf8'));
};