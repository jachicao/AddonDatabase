'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('champion', new mongoose.Schema({
  id: { type: String, unique: true, index: true, required: true },
  name: { type: String, unique: true, required: true },
  roles: [ { type: String, enum: ['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'], required: true } ],
  splashUrl: { type: String, required: true },
  loadingUrl: { type: String, required: true },
  squareUrl: { type: String, required: true }
}));
