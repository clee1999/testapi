const mongoose = require("mongoose");


mongoose.set('debug', true);

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('❌ CANNOT CONNECT TO MongoDB DATABASE !', err);
});
db.on('disconnected', () => {
    console.log('DISCONNECTED from MongoDB DATABASE !');
});
db.on('parseError', (err) => {
    console.error('❌ parseError... ', err);
});
db.on('open', (err) => {
    if (err) console.error('❌ openError... ', err);
    else console.log('✅ Mongo loaded.');
});


(mongoose.connect(process.env.MONGO_URI)).connection;