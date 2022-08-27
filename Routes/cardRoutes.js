const express=require('express');
const {
  getCardById,
  getCards,
  CreateCard,
  DeleteCard,
  UpdateCard,
} =require("../Controller/cardController.js");
const router = express.Router();
const { protect } =require("../middlewares/authMiddleware.js");

router.route("/").get(protect, getCards);
router.route("/:id").get(protect, getCardById).delete(protect, DeleteCard).put(protect, UpdateCard);
router.route("/create").post(protect, CreateCard);

module.exports = router;