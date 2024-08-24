const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {

    useNewUrlParser: true,
    useUnifiedTopology: true



}).then(() => {
    console.log('DB connected===>');
}).catch(err => {
    console.error('DB error=====>', err);
});

module.exports = mongoose;