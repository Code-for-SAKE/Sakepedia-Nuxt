const BreweryYearData = require('../models/BreweryYearData');
const validator = require('express-validator');
const paginate = require('express-paginate');
const japanese = require('../../utils/japanese');

// Get all
module.exports.all = function (req, res, next) {
  var keyword = req.query.keyword;
  var sake = req.query.sake;
  var search = {};

  if (sake) [(search.sake = { _id: sake })];
  if (keyword) {
    search.$or = [{ sake: { name: new RegExp(keyword, 'i') } }];
  }
  refSake = { path: 'sake', select: 'name' };
  BreweryYearData.paginate(
    search,
    {
      page: req.query.page,
      limit: req.query.limit,
      populate: refSake,
      sort: { makedBY: -1, modifiedAt: -1 },
    },
    async function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting records.',
        });
      }
      return res.json({
        bydatas: result.docs,
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
  BreweryYearData.findOne({ _id: id }).exec(async function (err, data) {
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
      await data.populate('sake', 'name').execPopulate();
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
  BreweryYearData.find(search)
    .select('name')
    .limit(10)
    .exec(function (err, data) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting records. : ' + err,
        });
      }
      return res.json(data);
    });
};

// Create
module.exports.create = [
  // validations rules
  validator.body('sake', 'Please enter Sake').isLength({ min: 1 }),
  validator.body('makedBY').custom((value, { req }) => {
    return BreweryYearData.findOne({
      makedBY: value,
      sake: req.body.sake,
    }).then((bydata) => {
      if (bydata !== null) {
        return Promise.reject('すでに登録済みです');
      }
    });
  }),

  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var bydata = new BreweryYearData({
      sake: req.body.sake,
      makedBY: req.body.makedBY,
      aminoAcidContent: req.body.aminoAcidContent,
      alcoholContent: req.body.alcoholContent,
      sakeMeterValue: req.body.sakeMeterValue,
      acidity: req.body.acidity,
      ricePolishingRate: req.body.ricePolishingRate,
      sakeYeast: req.body.sakeYeast,
      riceForMakingKoji: req.body.riceForMakingKoji,
      sakeRiceExceptForKojiMaking: req.body.sakeRiceExceptForKojiMaking,
      bottledDate: req.body.bottledDate,
      createdAt: new Date(),
      modifiedAt: new Date(),
      userId: req.user._id,
    });

    // save record
    bydata.save(function (err, bydata) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record',
          error: err,
        });
      }
      return res.json({
        message: 'saved',
        _id: bydata._id,
      });
    });
  },
];

// Update
module.exports.update = [
  // validation rules
  validator.body('sake', 'Please enter Sake').isLength({ min: 1 }),
  validator.body('makedBY').custom((value, { req }) => {
    return BreweryYearData.findOne({
      makedBY: value,
      sake: req.body.sake,
      _id: { $ne: req.params.id },
    }).then((bydata) => {
      if (bydata !== null) {
        return Promise.reject('すでに登録済みです');
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
    BreweryYearData.findOne({ _id: id }, function (err, bydata) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record update sake',
          error: err,
        });
      }
      if (!bydata) {
        return res.status(404).json({
          message: 'No such record',
        });
      }

      // initialize record
      bydata.sake = req.body.sake ? req.body.sake : bydata.sake;
      bydata.makedBY = req.body.makedBY ? req.body.makedBY : bydata.makedBY;
      bydata.aminoAcidContent = req.body.aminoAcidContent
        ? req.body.aminoAcidContent
        : bydata.aminoAcidContent;
      bydata.alcoholContent = req.body.alcoholContent
        ? req.body.alcoholContent
        : bydata.alcoholContent;
      bydata.sakeMeterValue = req.body.sakeMeterValue
        ? req.body.sakeMeterValue
        : bydata.sakeMeterValue;
      bydata.acidity = req.body.acidity ? req.body.acidity : bydata.acidity;
      bydata.ricePolishingRate = req.body.ricePolishingRate
        ? req.body.ricePolishingRate
        : bydata.ricePolishingRate;
      bydata.sakeYeast = req.body.sakeYeast
        ? req.body.sakeYeast
        : bydata.sakeYeast;
      bydata.riceForMakingKoji = req.body.riceForMakingKoji
        ? req.body.riceForMakingKoji
        : bydata.riceForMakingKoji;
      bydata.sakeRiceExceptForKojiMaking = req.body.sakeRiceExceptForKojiMaking
        ? req.body.sakeRiceExceptForKojiMaking
        : bydata.sakeRiceExceptForKojiMaking;
      bydata.bottledDate = req.body.bottledDate
        ? req.body.bottledDate
        : bydata.bottledDate;
      bydata.modifiedAt = new Date();
      bydata.userId = req.user._id;

      // save record
      bydata.save(function (err, bydata) {
        if (err) {
          return res.status(500).json({
            message: 'Error getting record update bydata.',
            error: err,
          });
        }
        if (!bydata) {
          return res.status(404).json({
            message: 'No such record',
          });
        }
        return res.json(bydata);
      });
    });
  },
];

// Delete
module.exports.delete = function (req, res) {
  var id = req.params.id;
  BreweryYearData.findByIdAndRemove(id, function (err, data) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.',
        error: err,
      });
    }
    return res.json(data);
  });
};
