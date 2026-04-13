import express from "express";
import {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", verifyJWT, createTodo);
router.get("/get-all-todo", verifyJWT, getAllTodos);
router.put("/update/:id", verifyJWT, updateTodo);
router.delete("/delete/:id", verifyJWT, deleteTodo);

export default router;