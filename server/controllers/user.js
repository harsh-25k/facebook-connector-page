const operations = require("../db/repository/user_operations")

module.exports = {

   async register(req,res){
      
    try{
        const user = req.body;

        console.log(req.body);

        const foundUser = await operations.registeredEmail(user.email);

        if(foundUser){
            res.send({message:"User already Registered !"});
        }else{

            const result = await operations.add(user);

            if(result){
                res.send({message:"true"});
            }
            else{
                res.send({message:"Some Error Occured.Try Again !"});
            }
        }
    }catch(err){
      console.log(err);
    }
    },

   async login(req,res){
         
      const user = req.body;

     const found = await operations.find(user);

      if(found){
         res.send({message:"true"})
      }else{
          res.send({message:"Invalid Credentials !"})
      }
     
    }
}