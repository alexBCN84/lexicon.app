const mongoose = require('mongoose')

mongoose.Promise = global.Promise


const connectionString = process.env.DB_URL || 'mongodb://localhost/lexiconjs'
mongoose.connect(connectionString, { useMongoClient: true })
    // copied from node course wes bos
    // mongoose.connection.on('error', (err) => {
    //     console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
    // });