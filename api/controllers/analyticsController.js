const Brewery = require('../models/Brewery');
const Brand = require('../models/Brand');
const Sake = require('../models/Sake');
const User = require('../models/User');
const Comment = require('../models/Comment');

module.exports.summary = async function (req, res) {
  const brewery = await Brewery.count();
  const brand = await Brand.count();
  const sake = await Sake.count();
  const user = await User.count();
  const comment = await Comment.count();
  return res.json({
    summary: {
      brewery: brewery,
      brand: brand,
      sake: sake,
      user: user,
      comment: comment,
    },
  });
};
