const express = require("express");
const router = express.Router();
const {
  loginEvent,
  registerEvent,
  getEvent,
  getAllEvent,
  editEvent,
  topUpEvent,
  inventoryFunction,
  deleteEvent,
  payEvent,
} = require("../controllers/UserController");

// POST route for user login
router.post("/session", loginEvent);

// POST route for user registration
router.post("/register", registerEvent);

// GET route to get all users
router.get("/getAll", getAllEvent);

router.put("/edit", editEvent);

router.get("/get", getEvent);

// POST route for top-up
router.post("/topup", topUpEvent);

// POST route for inventory
router.post("/inventory", inventoryFunction);

//POST
router.post("/pay", payEvent);

// DELETE route to delete user
router.delete("/delete", deleteEvent);

module.exports = router;
