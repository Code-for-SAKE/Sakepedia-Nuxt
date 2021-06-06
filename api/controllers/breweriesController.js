const Brewery = require('../models/Brewery');
const validator = require('express-validator');
const paginate = require('express-paginate');
const japanese = require('../../utils/japanese');
const geocoder = require('nuxt-simple-geocoding-ja');

// Get all
module.exports.all = function (req, res, next) {
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
  Brewery.paginate(
    search,
    { page: req.query.page, limit: req.query.limit },
    function (err, result) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting records.',
        });
      }
      return res.json({
        breweries: result.docs,
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
  Brewery.findOne({ _id: id }).exec(function (err, brewery) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.' + err,
      });
    }
    if (!brewery) {
      return res.status(404).json({
        message: 'No such record',
      });
    }
    return res.json(brewery);
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
  Brewery.find(search)
    .select('name')
    .limit(10)
    .exec(function (err, breweries) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting records. : ' + err,
        });
      }
      return res.json(breweries);
    });
};

// get locations of all breweries
module.exports.getLocations = function (req, res, next) {
  Brewery.find({ latitude: { $exists: true } })
    .select('name address latitude longitude')
    .exec(function (err, breweries) {
      if (err) {
        return res.status(500).json({
          message: 'Error getting records. : ' + err,
        });
      }
      return res.json(breweries);
    });
};

// Create
module.exports.create = [
  // validations rules
  validator.body('name', 'Please enter Brewery Name').isLength({ min: 1 }),
  validator.body('breweryId').custom((value, { req }) => {
    if (!value) return true;
    if (value == '') return true;
    if (value.length != 13) {
      return Promise.reject('法人番号は13桁です。');
    }
    return true;
  }),

  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var brewery = new Brewery({
      breweryId: req.body.breweryId,
      name: req.body.name,
      kana: req.body.kana,
      prefecture: req.body.prefecture,
      address: req.body.address,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      email: req.body.email,
      tel: req.body.tel,
      url: req.body.url,
      ecurl: req.body.ecurl,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      othersns: req.body.othersns,
      startYear: req.body.startYear,
      endYear: req.body.endYear,
      userId: req.user._id,
    });

    // update geocode from address when geocode is null
    if (req.body.latitude === null || req.body.longitude === null) {
      geocoder(brewery.address, (latlng) => {
        brewery.latitude = latlng.lat;
        brewery.longitude = latlng.lng;
        saveBrewery(brewery, res);
      });
    } else {
      saveBrewery(brewery, res);
    }
  },
];

function saveBrewery(brewery, res) {
  // save record
  brewery.save(function (err, brewery) {
    if (err) {
      return res.status(500).json({
        message: 'Error saving record',
        error: err,
      });
    }
    return res.json({
      message: 'saved',
      _id: brewery._id,
    });
  });
}

// Update
module.exports.update = [
  // validation rules
  validator.body('name', 'Please enter Brewery Name').isLength({ min: 1 }),
  validator.body('breweryId').custom((value, { req }) => {
    if (!value) return true;
    if (value == '') return true;
    if (value.length != 13) {
      return Promise.reject('法人番号は13桁です。');
    }
    return true;
  }),

  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var id = req.params.id;
    Brewery.findOne({ _id: id }, function (err, brewery) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record',
          error: err,
        });
      }
      if (!brewery) {
        return res.status(404).json({
          message: 'No such record',
        });
      }

      // initialize record
      brewery.breweryId = req.body.breweryId
        ? req.body.breweryId
        : brewery.breweryId;
      brewery.name = req.body.name ? req.body.name : brewery.name;
      brewery.kana = req.body.kana ? req.body.kana : brewery.kana;
      brewery.prefecture = req.body.prefecture
        ? req.body.prefecture
        : brewery.prefecture;
      brewery.address = req.body.address ? req.body.address : brewery.address;
      brewery.latitude = req.body.latitude
        ? req.body.latitude
        : brewery.latitude;
      brewery.longitude = req.body.longitude
        ? req.body.longitude
        : brewery.longitude;
      brewery.email = req.body.email ? req.body.email : brewery.email;
      brewery.tel = req.body.tel ? req.body.tel : brewery.tel;
      brewery.url = req.body.url ? req.body.url : brewery.url;
      brewery.ecurl = req.body.ecurl ? req.body.ecurl : brewery.ecurl;
      brewery.facebook = req.body.facebook
        ? req.body.facebook
        : brewery.facebook;
      brewery.twitter = req.body.twitter ? req.body.twitter : brewery.twitter;
      brewery.instagram = req.body.instagram
        ? req.body.instagram
        : brewery.instagram;
      brewery.othersns = req.body.othersns
        ? req.body.othersns
        : brewery.othersns;
      brewery.startYear = req.body.startYear
        ? req.body.startYear
        : brewery.startYear;
      brewery.endYear = req.body.endYear ? req.body.endYear : brewery.endYear;
      brewery.userId = req.user._id;

      // update geocode from address when geocode is null
      if (req.body.latitude === null || req.body.longitude === null) {
        geocoder(brewery.address, (latlng) => {
          brewery.latitude = latlng.lat;
          brewery.longitude = latlng.lng;
          saveBrewery(brewery, res);
        });
      } else {
        saveBrewery(brewery, res);
      }
    });
  },
];

// Delete
module.exports.delete = function (req, res) {
  var id = req.params.id;
  Brewery.findByIdAndRemove(id, function (err, brewery) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.',
      });
    }
    return res.json(brewery);
  });
};

//Update Location & Return None Location Breweries
module.exports.updateLocation = function (req, res, next) {
  cnt = 0;
  Brewery.find().exec(function (err, breweries) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting records. : ' + err,
      });
    }
    updated = breweries.map((brewery) => {
      // update geocode from address when geocode is null
      if (cnt < 100) {
        if (brewery.latitude === null || brewery.longitude === null) {
          cnt += 1;
          geocoder(brewery.address, (latlng) => {
            console.log('GEOCODE:' + latlng.lat + ' add:' + brewery.address);
            brewery.latitude = latlng.lat;
            brewery.longitude = latlng.lng;
            brewery.save(function (err, brewery) {
              if (err) console.log('SAVE:' + err);
            });
          });
        }
        return { name: brewery.name, latitude: brewery.latitude };
      }
    });

    search = {
      $or: [{ latitude: null }, { longitude: null }],
    };
    Brewery.find(search).exec(function (err, breweries) {
      return res.json(
        breweries.map((brewery) => {
          return { name: brewery.name, address: brewery.address };
        })
      );
    });
  });
};
