const mongoose = require("mongoose");
const restaurantModel = require("./restaurantConfig");


const tableSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    status:{
        type: String,
        required:true,
        enum:["occupied", "unoccupied"]
    }
},{
    timestamps:true
});


tableSchema.pre('save', async function (next) {
    const recordCount = await tableModel.countDocuments();
    const {MAX_TABLE_COUNT} = await restaurantModel.findOne({}).lean();
  
    if (recordCount >= MAX_TABLE_COUNT) {
      const error = new Error(`Maximum number of records (${MAX_TABLE_COUNT}) reached.`);
      return next(error);
    }
  
    next();
  });

  const tableModel = mongoose.model("table", tableSchema);

module.exports = tableModel;