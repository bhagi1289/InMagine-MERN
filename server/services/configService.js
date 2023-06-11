const configModel = require("../models/restaurantConfig");
const logger = require('../logger');


class TableConfig {
    update = async(data)=>{
        let response = await configModel.getInstanceAndUpdate(data);
        if(response){
            logger.info("Config created.");
            return response;
        }
        else{
            logger.error("Error while creating config");
            return;
        }

    };

    get = async()=>{
        let data = await configModel.getInstance();
        if(data){
            logger.info("read config model");
            return data;
        }else{
            logger.error("Error while getting config schema");
            return;
        }
    };


}


module.exports = {
    getInst: ()=>{
        return new TableConfig();
    }
}