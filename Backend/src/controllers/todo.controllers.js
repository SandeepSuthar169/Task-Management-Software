// controllers/todo.controller.js
import { Todo } from "../models/Todo.models.js";

export const createTodo = async (req, res) => {
  try {
    const { title, completed, subtasks } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Todo text is required" });
    }

    const todo = await Todo.create({
      title,
      subtasks: subtasks || [],
      completed: completed || false,
      userId: req.user?._id, 
    });


    res.status(201).json({
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    console.error("Error in createTodo:", error);
    res.status(500).json(
      { 
        message: "Internal server error" 
      }
    );
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const { userId } = req.user?._id
    const todos = await Todo
      .find({ userId })
      .sort({ createAt: -1})

    res.status(200).json({
      success: true,
      data: todos
    })
  
  } catch (error) {
    console.error("Error in getTodos:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error", 
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const updateTodo = await Todo.findByIdAndUpdate( 
      id,
      req.body,
      {
        new: true,
        runValidators: true
      } 
    )

    if (!updateTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (title !== undefined) updateTodo.title = title;
    if (completed !== undefined) updateTodo.completed = completed;

    await updateTodo.save();

    res.status(200).json({
      message: "Todo updated successfully",
      updateTodo,
    });

  } catch (error) {
    console.error("Error in updateTodo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!deleteTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });

  } catch (error) {
    console.error("Error in deleteTodo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

