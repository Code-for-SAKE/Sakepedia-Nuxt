const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const BreweryYearData = new Schema({
  sake: { type: Schema.Types.ObjectId, ref: "Sake", required: true },
  makedBY: { type: Number, required: true },
  aminoAcidContent: { type: [Number, Number] },
  alcoholContent: { type: [Number, Number] },
  sakeMeterValue: { type: [Number, Number] },
  acidity: { type: [Number, Number] },
  ricePolishingRate: { type: [Number, Number] },
  sakeYeast: { type: String },
  riceForMakingKoji: { type: String },
  sakeRiceExceptForKojiMaking: { type: String },
  bottledDate: { type: Date },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  author: { type: String },
});

BreweryYearData.plugin(mongoosePaginate);
module.exports = mongoose.model("BreweryYearData", BreweryYearData);
