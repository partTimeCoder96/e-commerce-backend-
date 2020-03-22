require('dotenv').config()


const mongoose= require('mongoose');

const express=require('express');
const app=express();

mongoose.connect(process.env.DATABASE, 
{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
    
}
).then((res)=>{
console.log("DB CONNECTED");
}).catch((err)=>{
console.log("ERR IN DB CONNECTED",err);
})

const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`app is running at ${port}`);
})

