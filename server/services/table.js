const tableModel = require("../models/table");
const configService = require("../services/configService").getInst();

const logger = require('../logger');
const Queue = require("../models/queue");

class Table {

    getAll = async ()=>{
        let tables = await tableModel.find({}).lean();
        return tables;
    }

    create = async (data) => {

        let table = await tableModel.create(data);
        if (table) {
            logger.info("table created")
            return table;
        }

    };

    get = async ({ status }) => {
        let data = await tableModel.find({ status: status }).lean();
        if (data) {
            logger.info(`Geting table of status: ${status}`)
            return data;
        }
    }

    getDataById = async({id})=>{
        let data = await tableModel.findById(id).lean();
        if(data){
            logger.info(`Getting table with id: ${id}`);
            return data;
        }
    }

    update = async({tableId, name, status})=>{
        let updatedData = await tableModel.findOneAndUpdate({_id:tableId},{name, status},{new:true});
        return updatedData;
    }

    deleteTable = async(tableId)=>{
        let data = await tableModel.findByIdAndDelete(tableId);
        return data;
    }

    allocateTablesToCustomers = async (numberOfCustomers) => {
        try {

            const { MAX_TABLE_COUNT, CHAIRS_PER_TABLE } = await configService.get();

            // Calculate the number of tables needed based on customer count and chairs per table
            const tablesNeeded = Math.ceil(numberOfCustomers / CHAIRS_PER_TABLE);
            if (tablesNeeded > MAX_TABLE_COUNT) {
                throw new Error('Insufficient tables available');
            }

            const occupiedTables = await tableModel.countDocuments({ status: 'occupied' }).exec();
            let unoccupiedTables = await this.get({ status: "unoccupied" });
            if (unoccupiedTables.length < tablesNeeded) {

                const occupancy = numberOfCustomers - (occupiedTables * CHAIRS_PER_TABLE);
                var remainingCustomers = occupancy > 0 ? occupancy : numberOfCustomers;
                let _queue = await Queue.find({}).lean();
                // await Queue.create({ noOfCustomers: remainingCustomers })
                remainingCustomers = remainingCustomers + _queue[0]['noOfCustomers'];
                
                await Queue.findByIdAndUpdate({_id:_queue[0]['_id']}, {noOfCustomers:remainingCustomers});
                // throw new Error('Insufficient unoccupied tables available');
            }
            // Allocate tables to customers
            var allocatedTables = unoccupiedTables.slice(0, tablesNeeded);

            await tableModel.updateMany(
                { _id: { $in: allocatedTables.map((table) => table._id) } },
                { status: 'occupied' },
                { new: true }
            );

            if(allocatedTables.length>0)
            allocatedTables = allocatedTables.map(table => {
                table.status = "occupied";
                return table;
        }); // changing the status and the DB records got updated


            let queue  = await Queue.find({}).lean();
            return { allocatedTables, queuedMembers: queue[0].noOfCustomers || 0 };

        } catch (error) {
            logger.error("error ", error);
            throw error
        }
    }

}


module.exports = {
    getInst: function () {
        return new Table();
    }
}