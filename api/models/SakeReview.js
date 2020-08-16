const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SakeReview = new Schema ({
  sake: { type: ObjectId, required: true },
  mariage: { type: String },
  matchDrinkingVessel: { type: String },
  matchDrinkingSceneAndTarget: { type: String },
  matchDrinkingTemperature: { type: [Number,Number] },
  stars: { type: Number },
  aroma: { type: Number },
  taste: { type: Number },
  description: { type: String },
  author: { type: String, required: true },
});

module.exports = mongoose.model('SakeReview', SakeReview)
