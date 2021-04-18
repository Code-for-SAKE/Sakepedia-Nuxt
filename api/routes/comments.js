const config = require("../config");
const { Router } = require("express");
const paginate = require("express-paginate");

const router = Router();

// Initialize Controller
const commentsController = require("../controllers/commentsController");

// Get All
router.get("/comments", paginate.middleware(10, 50), commentsController.all);

// Get One
router.get("/comments/:id", commentsController.show);

// Create
router.post("/comments", config.isAuthenticated, commentsController.create);

// Update
router.put("/comments/:id", config.isAuthenticated, commentsController.update);

// Delete
router.delete(
  "/comments/:id",
  config.isAuthenticated,
  commentsController.delete
);

module.exports = router;
