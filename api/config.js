const config = {
}

module.exports = config

module.exports.isAuthenticated = function (req, res, next) {
  if(!req.user) {
    return res.status(401).json({message: 'unauthorized'})
  }
  next()
}
