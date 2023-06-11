const queue = require("../services/queue").getInst();
const logger = require("../logger");


class QueueController {

    update = async (req, res) => {
        try {
            const { id, noOfCustomers } = req.body;
            let update = await queue.update({ id, noOfCustomers });
            if (update) {
                logger.info("Queue record created");
                res.status(200).json({ message: "Record updated" });
            } else {
                logger.error("Error while creating reocrd");
                res.status(400).json({ message: "Error while creating Queue" });
            }
        } catch (error) {
            logger.error("Error while creating Config", error);
            res.status(500).json({ message: "Error while creating Queue" });
        }
    };

    get = async (req, res) => {
        try {
            // const { queueId } = req.params.queueId;
            let data = await queue.getData();
            if (data) {
                logger.info("fetching queue record");
                res.status(200).json(data);
            } else {
                logger.error("Error while fetching reocrds");
                res.status(400).json({ message: "Error while fetching queue" });
            }
        } catch (error) {
            logger.error("Error while getting queue", error);
            res.status(500).json({ message: "Error while getting queue" });
        }
    }

    create = async (req, res) => {
        try {
            const { noOfCustomers } = req.body;
            let data = await queue.create({noOfCustomers:parseInt(noOfCustomers)});
            if (data) {
                logger.info("created queue");
                res.status(200).json(data);

            }
        } catch (error) {
            logger.error("Error while creating queue", error);
            res.status(500).json({ message: "Error while getting queue" });
        }
    }

    deleteQueue = async (req, res) => {
        try {
            const { queueId } = req.params.queueId;
            let data = await queue.deleteQueue({ queueId });
            if (data) {
                logger.info("created queue");
                res.status(200).json(data);

            }
        } catch (error) {
            logger.error("Error while creating queue", error);
            res.status(500).json({ message: "Error while getting queue" });
        }
    }
}

module.exports = {
    getInst: () => {
        return new QueueController();
    }
}