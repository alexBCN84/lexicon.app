// start our app
const app = require('./app')

// import environmental variables from our variables.env file. 
// Here you store anything that you need to keep safe
require('dotenv').config({ path: '../variables.env' });

app.listen(3000, () => {
    console.log('Server listening.')
})

mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});