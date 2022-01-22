const Brewery = require('../models/Brewery');
const Brand = require('../models/Brand');
const Sake = require('../models/Sake');
const validator = require('express-validator');
const paginate = require('express-paginate');
const japanese = require('../../utils/japanese');

// Get all
module.exports.all = function (req, res, next) {
  var keyword = req.query.keyword;
  var brewery = req.query.brewery;
  var brand = req.query.brand;
  const typeQuery = req.query.typeQuery;
  var search = {};

  if (brewery) [(search.brewery = brewery)];
  if (brand) [(search.brand = brand)];
  if (keyword) {
    search.$or = [
      { name: new RegExp(keyword, 'i') },
      { kana: new RegExp(japanese.hiraToKana(keyword), 'i') },
    ];
  }
  if (typeQuery) {
    // '吟醸  'みたいな検索をされてしまうとたぶんバグるので一度filterにかける
    search.$and = typeQuery
      .filter((eachType) => {
        return eachType;
      })
      .map((eachType) => {
        return { type: eachType };
      });
  }
  Sake.paginate(
    search,
    { page: req.query.page, limit: req.query.limit },
    function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting records.',
        });
      }
      return res.json({
        sakes: result.docs,
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
  Sake.findOne({ _id: id }).exec(async function (err, data) {
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
  Sake.find(search)
    .select('name')
    .limit(10)
    .exec(function (err, sakes) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting records. : ' + err,
        });
      }
      return res.json(sakes);
    });
};

// Create
module.exports.create = [
  // validations rules
  validator.body('name', 'Please enter Sake Name').isLength({ min: 1 }),
  validator.body('name').custom((value, { req }) => {
    return Sake.findOne({ name: value, _id: { $ne: req.params.id } }).then(
      (sake) => {
        if (sake !== null) {
          return Promise.reject('Name already in use');
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

    // initialize record
    var sake = new Sake({
      name: req.body.name,
      brand: req.body.brand,
      brewery: req.body.brewery,
      type: req.body.type,
      mariages: req.body.mariages,
      description: req.body.description,
      url: req.body.url,
      userId: req.user._id,
    });

    // save record
    sake.save(function (err, sake) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record',
          error: err,
        });
      }
      return res.json({
        message: 'saved',
        _id: sake._id,
      });
    });
  },
];

// Update
module.exports.update = [
  // validation rules
  validator.body('name', 'Please enter Sake Name').isLength({ min: 1 }),
  validator.body('name').custom((value, { req }) => {
    return Sake.findOne({ name: value, _id: { $ne: req.params.id } }).then(
      (sake) => {
        if (sake !== null) {
          return Promise.reject('Name already in use');
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
    Sake.findOne({ _id: id }, function (err, sake) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record update sake',
          error: err,
        });
      }
      if (!sake) {
        return res.status(404).json({
          message: 'No such record',
        });
      }

      // initialize record
      sake.name = req.body.name ? req.body.name : sake.name;
      sake.brand = req.body.brand ? req.body.brand : sake.brand;
      sake.brewery = req.body.brewery ? req.body.brewery : sake.brewery;
      sake.subname = req.body.subname ? req.body.subname : sake.subname;
      sake.type = req.body.type ? req.body.type : sake.type;
      sake.mariages = req.body.mariages ? req.body.mariages : sake.mariages;
      sake.description = req.body.description
        ? req.body.description
        : sake.description;
      sake.url = req.body.url ? req.body.url : sake.url;
      sake.userId = req.user._id;

      // save record
      sake.save(function (err, sake) {
        if (err) {
          return res.status(500).json({
            message: 'Error getting record update sake.',
            error: err,
          });
        }
        if (!sake) {
          return res.status(404).json({
            message: 'No such record',
          });
        }
        return res.json(sake);
      });
    });
  },
];

// Delete
module.exports.delete = function (req, res) {
  var id = req.params.id;
  Sake.findByIdAndRemove(id, function (err, sake) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.',
        error: err,
      });
    }
    return res.json(sake);
  });
};

// changes
module.exports.change = function (req, res) {
  Brewery.find({})
    .exec()
    .then(function (breweries) {
      Sake.find({}, function (err, result) {
        if (err) {
          return res.status(500).json({
            message: 'Error getting records.',
          });
        }
        for (var i = 0; i < result.length; i++) {
          sake = result[i];
          var brewery = breweries.filter(function (item, index) {
            if (item.name == sake.brewery) return true;
          });
          sake.breweryId = brewery._id;
          sake.save(function (err3, sake) {
            if (err3) {
              return res.status(500).json({
                message: 'Error getting record update sake.',
                error: err3,
              });
            }
            if (!sake) {
              return res.status(404).json({
                message: 'No such record',
              });
            }
          });
        }
      });
      console.log('done');
    });
};
