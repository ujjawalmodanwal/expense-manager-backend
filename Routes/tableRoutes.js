const express=require('express');
const {
  getTableRows,
  CreateTableRow,
  DeleteTableRow,
  UpdateTableRow
} =require("../Controller/tableController.js");
const router = express.Router();
const { protect } =require("../middlewares/authMiddleware.js");

router.route("/:id").get(protect, getTableRows);
router.route("/:id").delete(protect, DeleteTableRow).put(protect, UpdateTableRow);
router.route("/create/:id").post(protect, CreateTableRow);

module.exports = router;