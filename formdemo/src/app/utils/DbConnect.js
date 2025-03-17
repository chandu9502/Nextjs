import mongoose from 'mongoose'
export default async function Db(){
    await mongoose.connect('mongodb+srv://pogulachandrakanth:chandu45@cluster0.zta4w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>console.log('Db connected..')).catch(()=>console.log('failed to connect'));
}

