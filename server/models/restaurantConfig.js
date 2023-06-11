const mongoose = require('mongoose');

// Define your schema
const restaurantSchema = new mongoose.Schema({
  // Define your schema fields
  MAX_TABLE_COUNT: { type: Number, required: true },
  CHAIRS_PER_TABLE: { type: Number, required: true },
},{
  timestamps:true,
  
});

// Create a static method on the schema to retrieve the singleton instance
restaurantSchema.statics.getInstance = async function() {
  // 'this' refers to the model itself (Singleton)
  let data = await this.findOne({}).lean();
  return data;
};


restaurantSchema.statics.getInstanceAndUpdate = async function(updateData) {
  // 'this' refers to the model itself (Singleton)
  const instance = await this.findOne({});

  // If an instance exists, update it and return the updated instance
  if (instance) {
    Object.assign(instance, updateData);
    await instance.save();
    return instance;
  } else {
    // Create a new instance if one doesn't exist
    const newSingleton = new this(updateData);
    await newSingleton.save();
    return newSingleton;
  }
};
// Create the Singleton model
const restaurantModel = mongoose.model('restaurantConfig', restaurantSchema);

// Export the Singleton model
module.exports = restaurantModel;