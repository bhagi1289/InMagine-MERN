const admin = require("../models/admin");
const logger = require('../logger');

class Admin{
    createAdmin = async (options)=>{
        try {
            
            let user = await admin.create(options);
            if(user)
                logger.info("user created.")
                return user;
        } catch (error) {
            // logger.error(error);
            if(error.code === 11000)
                logger.warn("Admin already exists...");
            else
            throw error;       
        }
    }
}


module.exports = {
    getInst: function(){
        return new Admin();
    }
}