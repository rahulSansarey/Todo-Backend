const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const isAuthenticated = require("../auth.js");

// Toutes to addd the titoles and description
router.post("/saveTodo",isAuthenticated, async (req, res) => {
  try {
    const createdby=req.user._id
    const data = req.body;
    const todo = new Todo({...data,createdby});
    const savedTodo = await todo.save();

    if (!savedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Please Provide all the details" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Data Saved Successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
});

// Routes to get the data

router.get("/getTodo", isAuthenticated, async (req, res) => {
  try {
    const todo = req.body;
    const getTodo = await Todo.find({ createdby: req.user.id });

    if (!getTodo) {
      return res
        .status(404)
        .json({ success: false, message: "To do not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Data found", getTodo });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
});

// Routes for update the Todo

router.put("/:id", isAuthenticated,async  (req, res) => {
  try {
    const id = req.params.id;
    const updateTodo = req.body;
    const newTodo = await Todo.findByIdAndUpdate(id, updateTodo, {
      new: true,
      runValidators: true,
    });

    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "To do not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Data found and Updated", newTodo });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
});

// Routes to delete the Todo

router.delete("/deleteTodo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await Todo.findByIdAndDelete(id);
    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Todo item not found" });
    }
    {
      return res.status(200).json({ sucess: true, message: "Todo deleted" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
});

module.exports = router;
