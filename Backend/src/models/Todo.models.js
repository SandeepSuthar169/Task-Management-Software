import mongoose from "mongoose"

const subTodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  subtasks: [] 
}, { _id: true });

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false
  },
  subtasks: [subTodoSchema] 
}, {
  timestamps: true
});

export const Todo = mongoose.model("Todo", todoSchema);
