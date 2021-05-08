const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SakeReview = new Schema({
  sake: { type: Schema.Types.ObjectId, ref: 'Sake', required: true },
  mariage: { type: String },
  matchDrinkingVessel: { type: String },
  matchDrinkingSceneAndTarget: { type: String },
  matchDrinkingTemperature: { type: [Number, Number] },
  stars: { type: Number },
  aroma: { type: Number },
  taste: { type: Number },
  description: { type: String },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  author: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('SakeReview', SakeReview);
