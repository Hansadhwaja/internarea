const mongoose=require("mongoose")

 const historySchema = new mongoose.Schema({
  browser:{
    type:String
  },
  os:{
    type:String,
  },
  deviceType:{
    type:String,
  },
  IPAddress:{
    type:String
  },
  uid:{
    type:String
  },
  loginAt:{
    type:String,
},
 },{versionKey:false});
 
 module.exports=mongoose.model("History",historySchema)



 
    