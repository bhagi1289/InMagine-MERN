const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: String,
    totalMembers: Number,
  }));

module.exports = Customer;