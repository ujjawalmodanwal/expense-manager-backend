const mongoose = require("mongoose");

const tableSchema = mongoose.Schema(
  {
    goods: {
      type: String,
      required: true,
    },
    price: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    card_id:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Card",
    }
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("Table", tableSchema);

module.exports  = Table;