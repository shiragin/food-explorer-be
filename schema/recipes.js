const { request } = require("express");

const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
  idMeal: {
    type: String,

  },
  strCategory: {
    type: String,
  },
  strMeal: {
    type: String,
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
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewed: {
      type: Boolean,
      default: false
    }
  }],
  strMeasure: [{
    type: String,
  }],
  strMealThumb: {
    type: String
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;