const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Award = new Schema({
  brewery: { type: Schema.Types.ObjectId, ref: 'Brewery', required: true },
  award: { type: String, required: true },
  sakeName: { type: String },
  year: { type: Number, required: true },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  author: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

Award.plugin(mongoosePaginate);
module.exports = mongoose.model('Award', Award);
