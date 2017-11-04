'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('message', new mongoose.Schema({
  text: { type: String, required: true }
}));
