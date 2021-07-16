const user = require('../database/modals/user');
const logger = require('../logger/logger');
module.exports = async (req, res)=>{
   function validateEmail(email) {
       const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       return re.test(String(email).toLowerCase());
   }
   const email = req.body.email;
   function getlength(number) {
       return number.toString().length;
   }
   const no_of_digit = getlength(req.body.phone_no);
    if(validateEmail(email)&&no_of_digit===10){
   await user.create(req.body,(error,user)=>{
        if(error)
        {
            logger.error(error);
            res.status(403).json(error);
            console.log(`Error is ${error}`);
        } else if(user)
        {
            logger.info({message:"success"});
             res.status(200).json({message:"success"})
        }
    })
   } else if(validateEmail(email)==false)
     {
         logger.error({error:{status:403,message:"INVALID_EMAIL"}});
         res.status(403).json({error:{status:403,message:"INVALID_EMAIL"}});
     } else if(no_of_digit!==10)
     {
         logger.error({error:{status:403,message:"INVALID_PHONE_NO"}});
       res.status(403).json({error:{status:403,message:"INVALID_PHONE_NO"}});
     }
}
