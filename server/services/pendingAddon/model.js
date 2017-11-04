'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('pendingAddon', new mongoose.Schema({
  hwid: { type: String, unique: true, required: true },
  ip: { type: String, unique: true, required: true },
  addonId: { type: String }
}));
