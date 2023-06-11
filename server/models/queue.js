const mongoose = require('mongoose');


const Queue = mongoose.model('Queue', new mongoose.Schema({
    noOfCustomers: {
      type: Number,
      min:0,
      required:true
    }
  }));


module.exports = Queue;