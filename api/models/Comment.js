const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Comment = new Schema({
  comment: { type: String },
  image: { type: String },
  brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
  brewery: { type: Schema.Types.ObjectId, ref: 'Brewery' },
  sake: { type: Schema.Types.ObjectId, ref: 'Sake' },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  author: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});
Comment.virtual('commentId').get(function () {
  return this._id;
});
Comment.plugin(mongoosePaginate);
module.exports = mongoose.model('Comment', Comment);
