const { request } = require("express");

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },

  adoptionStatus: {
    type: String,
    required: true,
  },
 
  bio: {
    type: String,
  },
 
  
  saveduser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dietery: {
    type: Array,
  },
  breed: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Pet;
