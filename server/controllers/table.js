const table = require("../services/table").getInst();
const logger = require("../logger");


class Table {

    getAllTables = async (req, res) => {
        try {
            let tables = await table.getAll();
            if (tables) {
                logger.info("Fetching all tables");
                res.status(200).json(tables);
            } else {
                logger.error("Error while fetching tables");
                res.status(400).json({ message: "Error while fetching tables" })
            }
        } catch (error) {
            logger.error("Error while fetching table");
            res.status(500).json({ message: "Error while fetching tables" });
        }
    };

    create = async (req, res) => {
        try {
            let { name, status } = req.body;
            let data = await table.create({ name, status });
            if (data) {
                logger.info("table created.")
                res.status(200).json({ message: "Table created successfully" });
            }
            else {
                logger.error("Error while creating table")
                res.status(400).json({ message: "Error while creating the table" });
            }
        } catch (error) {
            logger.error("Error while creating table");
            res.status(500).json({ message: "Error while creating table" });
        }
    };

    allocateTable = async (req, res) => {
        try {
            const { numberOfCustomers } = req.query;

            let allocation = await table.allocateTablesToCustomers(Number.parseInt(numberOfCustomers));
            res.status(200).json(allocation);
        } catch (error) {
            res.status(500).json({ message: "Error allocating" });
        }
    };

    update = async (req, res) => {
        try {
            const { tableId } = req.params;
            const { name, status } = req.body;
            let updateTable = await table.update({ tableId, name, status });
            if (updateTable) {
                logger.info("data updated", updateTable);
                res.status(200).json({ message: "Record updated successfully" })
            } else {
                logger.error("Error while updating table");
                res.status(400).json({ message: "Error while updating" });
            }
        } catch (error) {
            logger.error("Error while updating ", error);
            res.status(500).json({ message: "Error while updating" });
        }
    };

    get = async (req, res) => {
        try {
            const { tableId } = req.params;
            let response = await table.getDataById({ id: tableId });
            if (response) {
                logger.info("fetching data from table");
                res.status(200).json(response);
            } else {
                logger.error("Error while fetching data");
                res.status(400).json({ message: "Error while fetching data" });
            }
        } catch (error) {
            logger.error("Error while getting data", error);
            res.status(500).json({ message: "Error while fetching data" });
        }
    };

    deleteRecord = async (req, res) => {
        try {
            const { tableId } = req.params;
            let response = await table.deleteTable(tableId);
           if(response){
            logger.info(`record successfully deleted with id:${tableId}`);
            res.status(200).json({ message: "deleted " })
           }else{
            res.status(400).json({ message: "Error" })
           }
        } catch (error) {
            res.status(500).json({ message: "Error while deleting data" });
        }
    }
}

module.exports = {
    getInst: () => {
        return new Table();
    }
}