const Brewery = require('../models/Brewery');
const Brand = require('../models/Brand');
const Sake = require('../models/Sake');
const Comment = require('../models/Comment');
const validator = require('express-validator');
const paginate = require('express-paginate');
const japanese = require('../../utils/japanese');

// Get all
module.exports.all = function (req, res, next) {
  var keyword = req.query.keyword;
  var brewery = req.query.brewery;
  var brand = req.query.brand;
  var sake = req.query.sake;
  var userId = req.query.userId;
  var sortField = req.query.sortField;
  var sortOrder = req.query.sortOrder;
  var search = {};

  if (brewery) {
    search.brewery = brewery;
  }
  if (brand) {
    search.brand = brand;
  }
  if (sake) {
    search.sake = sake;
  }
  if (userId) {
    search.userId = userId;
  }
  if (keyword) {
    search.$or = [
      { comment: new RegExp(keyword, 'i') },
      { comment: new RegExp(japanese.hiraToKana(keyword), 'i') },
      { comment: new RegExp(japanese.kanaToHira(keyword), 'i') },
    ];
  }
  
  Comment.paginate(
    search,
    { page: req.query.page, limit: req.query.limit, sort: {[sortField]: sortOrder} },
    function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting records.',
        });
      }
      return res.json({
        comments: result.docs,
        currentPage: result.page,
        pageCount: result.pages,
        pages: paginate.getArrayPages(req)(3, result.pages, req.query.page),
      });
    }
  );
};

// Get one
module.exports.show = function (req, res) {
  var id = req.params.id;
  Comment.findOne({ _id: id }).exec(async function (err, data) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.' + err,
      });
    }
    if (!data) {
      return res.status(404).json({
        message: 'No such record',
      });
    }
    try {
      await data.populate('brewery', 'name').execPopulate();
    } catch (e) {}
    try {
      await data.populate('brand', 'name').execPopulate();
    } catch (e) {}
    try {
      await data.populate('sake', 'name').execPopulate();
    } catch (e) {}
    return res.json(data);
  });
};

// Create
module.exports.create = [
  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var comment = new Comment({
      comment: req.body.comment,
      image: req.body.image,
      brand: req.body.brand,
      brewery: req.body.brewery,
      sake: req.body.sake,
      mariages: req.body.mariages,
      userId: req.user._id,
    });

    // save record
    comment.save(function (err, data) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record',
          error: err,
        });
      }
      return res.json({
        message: 'saved',
        _id: data._id,
      });
    });
  },
];

// Update
module.exports.update = [
  // validations rules
  validator.body('comment').custom((value, { req }) => {
    return Comment.findOne({ _id: req.params.id }).then((comment) => {
      if (comment.userId.toString() != req.user._id.toString()) {
        return Promise.reject('Not your comment');
      }
    });
  }),

  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    var id = req.params.id;
    Comment.findOne({ _id: id }, function (err, data) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record update comment',
          error: err,
        });
      }
      if (!data) {
        return res.status(404).json({
          message: 'No such record',
        });
      }

      // initialize record
      data.comment = req.body.comment ? req.body.comment : data.comment;
      data.image = req.body.image ? req.body.image : data.image;
      data.brand = req.body.brand ? req.body.brand : data.brand;
      data.brewery = req.body.brewery ? req.body.brewery : data.brewery;
      data.sake = req.body.sake ? req.body.sake : data.sake;
      data.mariages = req.body.mariages ? req.body.mariages : data.mariages;

      // save record
      data.save(function (err, data) {
        if (err) {
          return res.status(500).json({
            message: 'Error getting record update comment.',
            error: err,
          });
        }
        if (!data) {
          return res.status(404).json({
            message: 'No such record',
          });
        }
        return res.json(data);
      });
    });
  },
];

// Delete
module.exports.delete = function (req, res) {
  var id = req.params.id;
  Comment.findByIdAndRemove(id, function (err, data) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.',
        error: err,
      });
    }
    return res.json(data);
  });
};
