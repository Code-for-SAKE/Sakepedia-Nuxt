const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Package = new Schema({
  sake: { type: Schema.Types.ObjectId, ref: 'Sake', required: true },
  volume: { type: Number },
  price: { type: Number },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  author: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

Package.plugin(mongoosePaginate);
module.exports = mongoose.model('Package', Package);
