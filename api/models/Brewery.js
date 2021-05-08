const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Brewery = new Schema({
  breweryId: { type: Number, index: { unique: true } },
  name: { type: String, required: true },
  kana: { type: String },
  prefecture: { type: Number },
  address: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  email: { type: String },
  tel: { type: String },
  url: { type: String },
  ecurl: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  othersns: { type: String },
  startYear: { type: Number },
  endYear: { type: Number },
  author: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

Brewery.plugin(mongoosePaginate);
module.exports = mongoose.model('Brewery', Brewery);
