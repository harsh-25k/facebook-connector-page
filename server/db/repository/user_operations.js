const UserModel = require("../models/user")

module.exports = {
    add(user){
        var promise = UserModel.create(user);
        return promise;
    },
   async  find(user){

        const found = await UserModel.findOne({email:user.email})

        if(found){
            if(found.password === user.password){
                return true
            }
            else{
                return false
            }
        }
        else{ 
            return false
        }

    },
    async registeredEmail(email){

        console.log(email);

        const found = await UserModel.findOne({email})

        if(found){
            return true;
        }
        else{
            return false;
        }
    }
    
}