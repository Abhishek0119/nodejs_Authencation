require('dotenv').config();
const bcrypt = require('bcrypt');
const user = require('../database/modals/user');
const logger = require('../logger/logger');
const jwt = require('jsonwebtoken');
const loginUser = async (req,res)=>{
    
function generateaccesstoken(user){
    return jwt.sign(user,process.env.SECERET_ACCESS_TOKEN,{expiresIn:60*60});
}

    await user.findOne({email:req.body.email}, function(err,user){
         if(err)
         {
            res.status(403).json({message:"error"});
         } else if(user)
         {
            const password1= bcrypt.compare(req.body.password,user.password,(error,same)=>{
                console.log(error,same);
                 if(same)
                 {
                   
                     const user = {
                         email:req.body.email,
                         password:req.body.password,
                     }
                      logger.info(user);
                     const access_token = generateaccesstoken(user);
                     res.status(200).json({message:{login_status:"The user is logged in",accesstoken:access_token,expiresIn:60*60}});
                 } else if(!same)
                 {
                     logger.error({error:{message:"INVALID_PASSWORD"}});
                     res.status(403).json({error:{message:"INVALID_PASSWORD"}});
                 } else if(error)
                 {
                     logger.error({error:{message:error}});
                     res.status(203).json({error:{message:error}});
                 }
             })
         } else {
             logger.error({error:{message:"This user does not exist."}});
             res.status(403).json({error:{message:"This user does not exist."}});
         }
     })
 }
 module.exports = loginUser;