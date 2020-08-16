const Sake = require('../models/Sake');
const validator = require('express-validator');
const paginate = require('express-paginate');
const japanese = require('../../utils/japanese');
const Brewery = require('../models/Brewery');

// Get all
module.exports.all = function (req, res, next) {
  var keyword = req.query.keyword
  var search = {}
  if(keyword) {
    search = {
      $or: [
          {name: new RegExp(keyword, 'i')},
          {kana: new RegExp(japanese.hiraToKana(keyword), 'i')}
      ]
    }
  }
  Sake.paginate(search, {page: req.query.page, limit: req.query.limit}, function(err, result) {
    if(err) {
        return res.status(500).json({
            message: 'Error getting records.'
        });
    }
    return res.json({
      sakes: result.docs,
      currentPage: result.page,
      pageCount: result.pages,
      pages: paginate.getArrayPages(req)(3, result.pages, req.query.page)
    });
  });
}


// Get one
module.exports.show = function(req, res) {
  var id = req.params.id;
  Sake.findOne({_id: id}).exec(function(err, sake){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.' + err
          });
      }
      if(!sake) {
          return res.status(404).json({
              message: 'No such record'
          });
      }
      return res.json(sake)
  });
}

//names
module.exports.list = function (req, res, next) {
  var keyword = req.query.keyword
  var search = {}
  if(keyword) {
    search = {
      $or: [
          {name: new RegExp(keyword, 'i')},
          {kana: new RegExp(japanese.hiraToKana(keyword), 'i')}
      ]
    }
  }
  Sake.find(search).select('name').limit(10).exec(function(err, sakes){
    if(err) {
        return res.status(500).json({
            message: 'Error getting records. : ' + err
        });
    }
    return res.json(sakes);
  });
}

// Create
module.exports.create = [
  // validations rules
  validator.body('name', 'Please enter Sake Name').isLength({ min: 1 }),
  validator.body('name').custom( (value, {req}) => {
    return Sake.findOne({ name:value, _id:{ $ne: req.params.id } })
      .then( sake => {
      if (sake !== null) {
        return Promise.reject('Name already in use');
      }
    })
  }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var sake = new Sake({
      name : req.body.name,
      brand : req.body.brand,
      brewery : req.body.brewery,
      type : req.body.type,
      aminoAcidContent : req.body.aminoAcidContent,
      alcoholContent : req.body.alcoholContent,
      sakeMeterValue : req.body.sakeMeterValue,
      acidity : req.body.acidity,
      ricePolishingRate : req.body.ricePolishingRate,
      sakeYeast : req.body.sakeYeast,
      riceForMakingKoji : req.body.riceForMakingKoji,
      sakeRiceExceptForKojiMaking : req.body.sakeRiceExceptForKojiMaking,
      volume : req.body.volume,
      price : req.body.price,
      award : req.body.award,
      description : req.body.description,
      url : req.body.url,
      author : req.user.name,
    })

    // save record
    sake.save(function(err, sake){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        return res.json({
            message: 'saved',
            _id: sake._id
        });
    })
  }
]

// Update
module.exports.update = [
  // validation rules
  validator.body('name', 'Please enter Sake Name').isLength({ min: 1 }),
  validator.body('name').custom( (value, {req}) => {
    return Sake.findOne({ name:value, _id:{ $ne: req.params.id } })
      .then( sake => {
      if (sake !== null) {
        return Promise.reject('Name already in use');
      }
    })
  }),

  function(req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var id = req.params.id;
    Sake.findOne({_id: id}, function(err, sake){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record update sake',
                error: err
            });
        }
        if(!sake) {
            return res.status(404).json({
                message: 'No such record'
            });
        }

        // initialize record
        sake.name =  req.body.name ? req.body.name : sake.name;
        sake.brand =  req.body.brand ? req.body.brand : sake.brand;
        sake.brewery =  req.body.brewery ? req.body.brewery : sake.brewery;
        sake.subname =  req.body.subname ? req.body.subname : sake.subname;
        sake.type =  req.body.type ? req.body.type : sake.type;
        sake.aminoAcidContent =  req.body.aminoAcidContent ? req.body.aminoAcidContent : sake.aminoAcidContent;
        sake.alcoholContent =  req.body.alcoholContent ? req.body.alcoholContent : sake.alcoholContent;
        sake.sakeMeterValue =  req.body.sakeMeterValue ? req.body.sakeMeterValue : sake.sakeMeterValue;
        sake.acidity =  req.body.acidity ? req.body.acidity : sake.acidity;
        sake.ricePolishingRate =  req.body.ricePolishingRate ? req.body.ricePolishingRate : sake.ricePolishingRate;
        sake.sakeYeast =  req.body.sakeYeast ? req.body.sakeYeast : sake.sakeYeast;
        sake.riceForMakingKoji =  req.body.riceForMakingKoji ? req.body.riceForMakingKoji : sake.riceForMakingKoji;
        sake.sakeRiceExceptForKojiMaking =  req.body.sakeRiceExceptForKojiMaking ? req.body.sakeRiceExceptForKojiMaking : sake.sakeRiceExceptForKojiMaking;
        sake.volume =  req.body.volume ? req.body.volume : sake.volume;
        sake.price =  req.body.price ? req.body.price : sake.price;
        sake.award =  req.body.award ? req.body.award : sake.award;
        sake.description =  req.body.description ? req.body.description : sake.description;
        sake.url =  req.body.url ? req.body.url : sake.url;
        sake.author =  req.user.name;

        // save record
        sake.save(function(err, sake){
            if(err) {
                return res.status(500).json({
                    message: 'Error getting record update sake.',
                    error: err
                });
            }
            if(!sake) {
                return res.status(404).json({
                    message: 'No such record'
                });
            }
            return res.json(sake);
        });
    });
  }

]


// Delete
module.exports.delete = function(req, res) {
  var id = req.params.id;
  Sake.findByIdAndRemove(id, function(err, sake){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.',
              error: err
          });
      }
      return res.json(sake);
  });
}
