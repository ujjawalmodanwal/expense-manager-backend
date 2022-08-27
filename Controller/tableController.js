const Table = require ("../models/tableModel.js");
const asyncHandler = require ("express-async-handler");

// @desc    Get logged in user notes
// @route   GET /api/notes
// @access  Private
const getTableRows = asyncHandler(async (req, res) => {
  const table = await Table.find({user:req.user._id} && {card_id:req.params.id});
  res.json(table);
});






const CreateTableRow = asyncHandler(async (req, res) => {
  const { goods, price, date } = req.body.newRow;
  if (!goods || !price) {
    res.status(400);
    throw new Error("Please Fill all the fields");
    return;
  } else {
    const row = new Table({ user: req.user._id,card_id:req.params.id, goods, price, date });
    const createdRow = await row.save();
    res.status(201).json(createdRow);
  }
});






const DeleteTableRow = asyncHandler(async (req, res) => {
  const row = await Table.find({_id:req.params.id});
  if (row[0] && row[0].user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }
  if (row[0]) {
    await row[0].remove();
    res.json({ message: "Row Removed!" });
  } else {
    res.status(404);
    throw new Error("Row not Found!");
  }
});





const UpdateTableRow = asyncHandler(async (req, res) => {
  const { goods, price, date } = req.body.editedRow;
  const row = await Table.find({_id:req.params.id});
  if (row[0] && row[0].user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }
  if (row[0]) {
    row[0].goods = goods;
    row[0].price = price;
    row[0].date = date;
    const updatedRow = await row[0].save();
    res.json(updatedRow);
  } else {
    res.status(404);
    throw new Error("Row not found!");
  }
});


module.exports = { getTableRows, CreateTableRow, DeleteTableRow, UpdateTableRow};
