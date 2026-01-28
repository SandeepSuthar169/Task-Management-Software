import mongoose, { Mongoose, Schema } from "mongoose";
import {
    TodoStatusEnum,
    AvailableTodoStatuses ,
    TodoPriority,
    AvailableTodoPriority
} from "../utils/constants.js"

const TodoSchema = new Schema(
    {
        text: {
            type: String,
            require: true
        },
        completed: {
            type: String,
            require: true
        },
        
    },
    {
        timestamps: true
    }
)

export  const Todo = mongoose.model("Todo", TodoSchema)