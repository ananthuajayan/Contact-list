const mongoose =  require('mongoose');

const dbConnect = ()=>{
    try{
       const mongoconnection = mongoose.connect(process.env.mongodbconnection);
       console.log("mongoDB connected");

    }
    catch(error){
      console.log(error);
      process.exit(1);
    }
}
module.exports = dbConnect;