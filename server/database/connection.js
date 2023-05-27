const mongoose = require('mongoose');

const connDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
module.exports = connDb;