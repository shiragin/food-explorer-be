const { request } = require("express");

const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
  idMeal: {
    type: String,
    required: true,
  },
  strCategory: {
    type: String,
    required: true,
  },
  strMeal: {
    type: String,
    required: true,
    unique: true,
  },
  strInstructions: {
    type: String
  },
  strArea: {
    type: String
  },
  strIngredient: [{
    type: String
  }],
  strMeasure: [{
    type: String,
  }],
  strMealThumb: {
    type: String
  }
  // saveduser: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User"
  //   },
  // ],
  // imageUrl: {
  //   type: String,
  //   require: true,
  // },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
