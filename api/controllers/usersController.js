const User = require('../models/User');
const Brewery = require('../models/Brewery');
const Brand = require('../models/Brand');
const Sake = require('../models/Sake');
const Comment = require('../models/Comment');

module.exports.create = function (type, identity, avatarUrl, username = null) {
  var user;
  if (type == 'git') {
    user = new User({
      type: type,
      identity: identity,
      avatarUrl: avatarUrl,
      gitUsername: username,
      name: username,
    });
  } else if (type == 'google') {
    user = new User({
      type: type,
      identity: identity,
      avatarUrl: avatarUrl,
      googleUsername: username,
      name: username,
    });
  }
  user.save(function (err, user) {
    if (err) {
      return err;
    }
    return user;
  });
};

module.exports.update = async function (req, res) {
  if (req.body.name === '') {
    return res.json({ error: '名前を入力してください' });
  }
  const user = await User.findOne({ _id: req.params.id });
  if (await User.findOne({ name: req.body.name })) {
    return res.json({ error: 'その名前はすでに使用されています' });
  }
  user.name = req.body.name;
  user.save((err, user) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json({ user: user });
  });
};

module.exports.show = async function (req, res) {
  const user = await User.findOne({ _id: req.params.id });
  return res.json({ name: user.name });
};

module.exports.contribute = async function (req, res) {
  const brewery = await Brewery.count({ userId: req.params.id });
  const brand = await Brand.count({ userId: req.params.id });
  const sake = await Sake.count({ userId: req.params.id });
  const comment = await Comment.count({ userId: req.params.id });
  return res.json({
    contribute: {
      brewery: brewery,
      brand: brand,
      sake: sake,
      comment: comment,
    },
  });
};
