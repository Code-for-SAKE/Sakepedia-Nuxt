const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    identity: {
      // type = git ならid, type = google ならsub
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    name: {
      type: String,
      unique: true,
    },
    gitUsername: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);
User.index({ type: '1', identity: '1' }, { unique: true });
module.exports = mongoose.model('User', User);
