import mongoose, { Schema} from "mongoose";
import {
    BoardTages, 
    AvailableBoardTages,
    BoardPriority,
    AvailableBoardPriority
} from "../utils/constants.js"

const boardSchema = new Schema(
    {
        boardName: {
            type: String,
            require: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        tags: {
            type: String,
            enum: AvailableBoardTages,
            default: BoardTages.NOT_STARTED
        },
        prioripy: {
            type: String,
            enum: AvailableBoardPriority,
            default: BoardPriority.HIGH
        },
        startDate: {
            type: Date,
            required: false
        },
        endDate: {
            type: Date,
            required: false
        }
    },
    {
        timeseries: true
    }
)



export const Board = mongoose.model("Board", boardSchema)