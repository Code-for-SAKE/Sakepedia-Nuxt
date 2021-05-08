const User = require('../models/User');

module.exports.create = function (type, identity, avatarUrl, username=null) {
  const user = new User({
    type: type,
    identity: identity,
    avatarUrl: avatarUrl,
    gitUsername: username
  });
  user.save(function (err, user) {
    if (err) {
      return err;
    }
    return user;
  });
};

module.exports.update = async function (req, res) {
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
