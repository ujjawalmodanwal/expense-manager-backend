const Cards = require ("../models/cardModel.js");
const asyncHandler = require ("express-async-handler");

// @desc    Get logged in user notes
// @route   GET /api/notes
// @access  Private
const getCards = asyncHandler(async (req, res) => {
  const cards = await Cards.find({user:req.user._id});
  res.json(cards);
});

//@description     Fetch single Note
//@route           GET /api/notes/:id
//@access          Public
const getCardById = asyncHandler(async (req, res) => {
  const card = await Cards.find({_id: req.params.id});

  if (card[0]) {
    res.json(card[0]);
  } else {
    res.status(404).json({ message: "Card not found!" });
  }

  res.json(card);
});

//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private
const CreateCard = asyncHandler(async (req, res) => {
  const { title, total_price, color } = req.body.newCard;

  if (!title || !color) {
    res.status(400);
    throw new Error("Please Fill all the fields");
    return;
  } else {
    const card = new Cards({ user: req.user._id, title,total_price, color });

    const createdCard = await card.save();

    res.status(201).json(createdCard);
  }
});

//@description     Delete single Note
//@route           GET /api/notes/:id
//@access          Private
const DeleteCard = asyncHandler(async (req, res) => {
  const card = await Cards.find({_id:req.params.id});
  if (card[0] && card[0].user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }
  if (card[0]) {
    await card[0].remove();
    res.json({ message: "Card Removed!" });
  } else {
    res.status(404);
    throw new Error("Card not Found!");
  }
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const UpdateCard = asyncHandler(async (req, res) => {
  const { title, total_price, color } = req.body.editedCard;

  const card = await Cards.find({_id:req.params.id});

  if (card[0] && card[0].user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action!");
  }

  if (card[0]) {
    card[0].title = title;
    card[0].total_price = total_price;
    card[0].color = color;
    const updatedNote = await card[0].save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Card not found!");
  }
});

module.exports = { getCardById, getCards, CreateCard, DeleteCard, UpdateCard };
