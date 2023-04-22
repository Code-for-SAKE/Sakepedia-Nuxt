const Brewery = require('../models/Brewery');
const Brand = require('../models/Brand');
const Sake = require('../models/Sake');
const User = require('../models/User');
const Comment = require('../models/Comment');

module.exports.summary = async function (req, res) {
  const brewery = await Brewery.estimatedDocumentCount();
  const brand = await Brand.estimatedDocumentCount();
  const sake = await Sake.estimatedDocumentCount();
  const user = await User.estimatedDocumentCount();
  const comment = await Comment.estimatedDocumentCount();
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
