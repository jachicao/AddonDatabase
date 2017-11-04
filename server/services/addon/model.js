'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('addon', new mongoose.Schema({
  championId: { type: String },
  name: { type: String, required: true },
  authorName: { type: String, required: true },
  forumUrl: { type: String, required: true },
  githubUrl: { type: String, required: true },
  category: { type: String, enum: ['Champion', 'Utility', 'Library'], default: 'Champion', required: true },
  utilityType: { type: String, enum: ['Evade', 'Awareness', 'Bot', 'Visual', 'Utility'], default: 'Utility' },
  libraryType: { type: String, enum: ['Prediction', 'Orbwalker', 'Library'], default: 'Library' },
  status: { type: String, enum: ['Unknown', 'Not working', 'Working'], default: 'Unknown' },
  type: { type: String, enum: ['Free', 'Buddy-Only', 'Paid'], default: 'Free' },
  createdAt: { type: Date, default: Date.now },
  likes: [ {
    hwid: { type: String, unique: true, sparse: true },
    ip: { type: String, unique: true, sparse: true }
  } ],
  wins: [ {
    created_at: { type: Date, default: Date.now }
  } ],
  losses: [ {
    created_at: { type: Date, default: Date.now }
  } ],
  pending: { type: Boolean, default: false }
}));
