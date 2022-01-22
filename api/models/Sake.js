const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Sake = new Schema({
  name: { type: String, required: true, index: { unique: true } },
  brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
  brewery: { type: Schema.Types.ObjectId, ref: 'Brewery' },
  subname: { type: String },
  type: { type: [String] },
  mariages: { type: [String] },
  description: { type: String },
  url: { type: String },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  author: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});
Sake.virtual('sakeId').get(function () {
  return this._id;
});
Sake.plugin(mongoosePaginate);
module.exports = mongoose.model('Sake', Sake);
