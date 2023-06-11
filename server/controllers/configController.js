const config = require("../services/configService").getInst();
const logger = require("../logger");


class ConfigController {

    update = async (req, res) => {
        try {
            const { MAX_TABLE_COUNT, CHAIRS_PER_TABLE } = req.body;
            let update = await config.update({ MAX_TABLE_COUNT, CHAIRS_PER_TABLE });
            if (update) {
                logger.info("Config record created");
                res.status(200).json({ message: "Record updated" });
            } else {
                logger.error("Error while creating reocrd");
                res.status(400).json({ message: "Error while creating Config" });
            }
        } catch (error) {
            logger.error("Error while creating Config", error);
            res.status(500).json({ message: "Error while creating Config" });
        }
    };

    get = async (req, res) => {
        try {
            let data = await config.get();
            if (data) {
                logger.info("fetching record");
                res.status(200).json(data);
            } else {
                logger.error("Error while fetching reocrds");
                res.status(400).json({ message: "Error while fetching Config" });
            }
        } catch (error) {
            logger.error("Error while creating Config", error);
            res.status(500).json({ message: "Error while getting Config" });
        }
    }
}

module.exports = {
    getInst: () => {
        return new ConfigController();
    }
}