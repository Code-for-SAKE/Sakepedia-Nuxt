import jwt from 'jsonwebtoken';
const User = require('./models/User');

const config = {};

module.exports = config;

module.exports.isAuthenticated = async function (req, res, next) {
  if (!req.user) {
    const authHeader = req.headers['authorization'];
    //HeaderにAuthorizationが定義されているか
    if (authHeader !== undefined) {
      //Bearerが正しく定義されているか
      if (authHeader.split(' ')[0] === 'Bearer') {
        try {
          const jwToken = jwt.verify(
            authHeader.split(' ')[1],
            process.env.JWT_SECRET
          );
          //ユーザー検索
          const currentUser = await User.findOne({
            _id: jwToken.sub,
          });
          req.user = currentUser;
        } catch (e) {
          console.log(e.message);
          return res.status(401).json({ error: e.message });
        }
      } else {
        return res
          .status(401)
          .json({ error: 'unauthorized (header format error)' });
      }
    } else {
      return res.status(401).json({ error: 'unauthorized (header error)' });
    }
  }
  next();
};
