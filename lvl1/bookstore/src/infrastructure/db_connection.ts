import mongoose from 'mongoose';

const UrlDB = process.env.UrlDB || '';

mongoose.connect(UrlDB);
const db = mongoose.connection;
db.on("open", ()=>{
    console.log(`MONGOOSE CONNECTION!`, UrlDB )
})