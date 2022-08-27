const mongoose = require("mongoose");

const cardSchema = mongoose.Schema(
  {	
    title: {
      type: String,
      required: true,
    },
    color: {
        type: String,
        required: true,
    },
    total_price: {
        type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cardSchema);

module.exports  = Card;
