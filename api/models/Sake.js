const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Sake = new Schema ({
  name: { type: String, required: true, index: { unique: true } },
  brand: { type: String },
  brewery: { type: String },
  subname: { type: String },
  type: { type: String },
  aminoAcidContent: { type: [Number,Number] },
  alcoholContent: { type: [Number,Number] },
  sakeMeterValue: { type: [Number,Number] },
  acidity: { type: [Number,Number] },
  ricePolishingRate: { type: [Number,Number] },
  sakeYeast: { type: String },
  riceForMakingKoji: { type: String },
  sakeRiceExceptForKojiMaking: { type: String },
  volume: { type: Number },
  price: { type: Number },
  award: { type: String },
  description: { type: String },
  url: { type: String },
  author: { type: String },
});

Sake.plugin(mongoosePaginate);
module.exports = mongoose.model('Sake', Sake)
