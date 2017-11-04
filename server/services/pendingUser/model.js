'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('pendingUser', new mongoose.Schema({
  token: { type: String },
  type: { type: String, enum: ['Admin', 'Support', 'Developer'], default: 'Developer' }
}));
