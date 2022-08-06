const Brand = require('../models/Brand');
const validator = require('express-validator');
const paginate = require('express-paginate');
const japanese = require('../../utils/japanese');
const Brewery = require('../models/Brewery');

// Get all
module.exports.all = function (req, res, next) {
  var keyword = req.query.keyword;
  var brewery = req.query.brewery;
  var search = {};

  if (brewery) [(search.brewery = brewery)];
  if (keyword) {
    search.$or = [
      { name: new RegExp(keyword, 'i') },
      { kana: new RegExp(japanese.kanaToHira(keyword), 'i') },
    ];
  }
  Brand.paginate(
    search,
    { page: req.query.page, limit: req.query.limit },
    function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting records.',
        });
      }
      return res.json({
        brands: result.docs,
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
  Brand.findOne({ _id: id }).exec(async function (err, data) {
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
  Brand.find(search)
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
  // validations rules
  validator.body('name', '名前を入力してください').isLength({ min: 1 }),
  //酒蔵ID+銘柄名でユニークにする。
  validator.body(['name']).custom((value, { req }) => {
    return Brand.findOne({
      name: value,
      _id: { $ne: req.params.id },
      brewery: req.body.brewery,
    }).then((data) => {
      if (data !== null) {
        return Promise.reject('すでに存在します');
      }
    });
  }),
  validator.body('brewery', '酒蔵を入力してください').isLength({ min: 1 }),

  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var brand = new Brand({
      name: req.body.name,
      kana: japanese.kanaToHira(req.body.kana),
      description: req.body.description,
      logo: req.body.logo,
      brewery: req.body.brewery,
      userId: req.user._id,
    });

    // save record
    brand.save(function (err, brand) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record',
          error: err,
        });
      }
      return res.json({
        message: 'saved',
        _id: brand._id,
      });
    });
  },
];

// Update
module.exports.update = [
  // validation rules
  validator.body('name', '名前を入力してください').isLength({ min: 1 }),
  validator.body('name').custom((value, { req }) => {
    return Brand.findOne({ name: value, _id: { $ne: req.params.id } }).then(
      (data) => {
        if (data !== null) {
          return Promise.reject('すでに存在します');
        }
      }
    );
  }),

  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var id = req.params.id;
    Brand.findOne({ _id: id }, function (err, data) {
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
      data.name = req.body.name ? req.body.name : data.name;
      data.kana = req.body.kana
        ? japanese.kanaToHira(req.body.kana)
        : data.kana;
      data.logo = req.body.logo !== undefined ? req.body.logo : data.logo;
      data.brewery = req.body.brewery ? req.body.brewery : data.brewery;
      data.description =
        req.body.description !== undefined
          ? req.body.description
          : data.description;
      data.userId = req.user._id;

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
  Brand.findByIdAndRemove(id, function (err, data) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.',
        error: err,
      });
    }
    return res.json(data);
  });
};
