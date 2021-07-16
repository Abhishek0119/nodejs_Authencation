const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    Name:{
        first_name:{
            type:String,
            required:true
           
        },
        last_name:{
            type:String,
            required:true
            
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    phone_no:{
        type:Number,
        required:true
        
    },
    password:{
        type:String,
        required:true
      
    }
})
userSchema.pre('save',function(next){
    const user= this;
  
    bcrypt.hash(user.password,10,function(error,encrypted){
     console.log(error,encrypted);
       user.password= encrypted;
       next();
    })
 });
 
const user = mongoose.model('user',userSchema);

module.exports = user;
