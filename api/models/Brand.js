const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const Brand = new Schema(
  {
    name: { type: String, required: true },
    kana: { type: String },
    brewery: { type: Schema.Types.ObjectId, ref: 'Brewery', required: true },
    logo: { type: String },
    description: { type: String },
    author: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

Brand.virtual('brandId').get(function () {
  return this._id;
});

Brand.plugin(mongoosePaginate);
module.exports = mongoose.model('Brand', Brand);
