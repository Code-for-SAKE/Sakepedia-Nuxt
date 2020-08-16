const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Brewery = new Schema ({
  name: { type: String, required: true, index: { unique: true } },
  kana: { type: String },
  prefecture: { type: Number },
  address: { type: String },
  email: { type: String },
  tel: { type: String },
  url: { type: String },
  startYear: { type: Number },
  author: { type: String },
});
Brewery.virtual('brewery').get(function() {
  return this.name;
});
Brewery.plugin(mongoosePaginate);
module.exports = mongoose.model('Brewery', Brewery)
