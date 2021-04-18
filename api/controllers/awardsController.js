const Award = require('../models/Award');
const validator = require('express-validator');
const paginate = require('express-paginate');
const japanese = require('../../utils/japanese');
const Brewery = require('../models/Brewery');

// Get all
module.exports.all = function (req, res, next) {
  var search = {
    brewery: req.query.brewery,
  };
  Award.paginate(
    search,
    { page: req.query.page, limit: req.query.limit },
    function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting records.',
        });
      }
      return res.json({
        awards: result.docs,
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
  Award.findOne({ _id: id })
    .populate('brewery')
    .exec(function (err, data) {
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
      return res.json(data);
    });
};

//names
module.exports.list = function (req, res, next) {
  var keyword = req.query.keyword;
  var search = {};
  if (keyword) {
    search = {
      $or: [
        { name: new RegExp(keyword, 'i') },
        { kana: new RegExp(japanese.hiraToKana(keyword), 'i') },
      ],
    };
  }
  Award.find(search)
    .select('name')
    .limit(10)
    .exec(function (err, datas) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting records. : ' + err,
        });
      }
      return res.json(datas);
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
    var award = new Award({
      brewery: req.body.brewery,
      award: req.body.award,
      sakeName: req.body.sakeName,
      year: req.body.year,
      createdAt: new Date(),
      modifiedAt: new Date(),
      author: req.user.name,
    });

    // save record
    award.save(function (err, award) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record',
          error: err,
        });
      }
      return res.json({
        message: 'saved',
        _id: award._id,
      });
    });
  },
];

// Update
module.exports.update = [
  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var id = req.params.id;
    Award.findOne({ _id: id }, function (err, data) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record update sake',
          error: err,
        });
      }
      if (!data) {
        return res.status(404).json({
          message: 'No such record',
        });
      }

      // initialize record
      data.brewery = req.body.brewery ? req.body.brewery : data.brewery;
      data.award = req.body.award ? req.body.award : data.award;
      data.sakeName = req.body.sakeName ? req.body.sakeName : data.sakeName;
      data.year = req.body.year ? req.body.year : data.year;
      data.modifiedAt = new Date();
      data.author = req.user.name;

      // save record
      data.save(function (err, data) {
        if (err) {
          return res.status(500).json({
            message: 'Error getting record update sake.',
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
  Award.findByIdAndRemove(id, function (err, data) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.',
        error: err,
      });
    }
    return res.json(data);
  });
};
