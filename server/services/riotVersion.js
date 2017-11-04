'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('riotVersion', new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
}));
