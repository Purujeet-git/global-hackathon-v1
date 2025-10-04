import mongoose from 'mongoose';

let isConnected = false;

export default async function connectDB() {
    if(isConnected) return;

    try{
        const db = await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'ClothSwap',
        });

        isConnected = db.connections[0].readyState;
        console.log("MongoDb Connected");
    }catch(err){
        console.error("MongoDb Connection Error:",err);
    }
}