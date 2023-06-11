
const logger = require('../logger');
const queueModel = require("../models/queue");

class Queue {
    create = async (data) => {

        let table = await queueModel.create(data);
        if (table) {
            logger.info("Queue created")
            return table;
        }

    };

    getData = async()=>{
        let data = await queueModel.find({}).lean();
        if(data){
            logger.info(`Getting Queue data`);
            return data[0];
        }
    }

    update = async({id, noOfCustomers})=>{
        let updatedData = await queueModel.findOneAndUpdate({_id:id},{noOfCustomers},{new:true});
        return updatedData;
    }

    deleteQueue = async({id})=>{
        let data = await queueModel.findByIdAndDelete(id);
        return data;
    }

}


module.exports = {
    getInst: function () {
        return new Queue();
    }
}