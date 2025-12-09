import mongoose from "mongoose";
import { Board } from "../models/boards.models.js";
import { User } from "../models/user.models.js"; 
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const createBoard = asyncHandler(async(req, res) => {
    const { boardName, tags, prioripy, startDate, endDate} = req.body

    if(!boardName || !tags || !prioripy || !startDate || !endDate) throw new ApiError(404, "Board info is requreid")
    
    const { userId } = req.params
    if(!userId) throw new ApiError(404, "userid is required")

    const user  = await User.findById(userId)
    // console.log(user);
    // console.log(userId);
    
    if(!user) throw new ApiError(404, "user is required")
        
    const board = await Board.create({
        boardName,
        tags,
        prioripy,
        startDate,
        endDate,
        assignBy: user._id
    })

    if(!board) throw new ApiError(404, "failed to create board")

    return res.status(200).json(
        new ApiResponse(
            200, 
            board,
            "board created successfully"
        )
    )

})


const getBoard = asyncHandler(async(req, res) => {

    const { boardId } = req.params
    if(!boardId) throw new ApiError(402, "board Id is required")
  

    const board = await Board.findById(boardId)

    
    if(!board) throw new ApiError(402, "board is required")

    return res.status(200).json(
        new ApiResponse(
            200,
            board,
            "board fetch successfully!"
                
        )
    )

})

const getAllBoard = asyncHandler(async(req, res) => {
    const { userId } = req.params
    if(!userId) throw new ApiError(404, "userid is required")

    const user  = await User.findById(userId) 
    if(!user) throw new ApiError(404, "user is required")


    const boad = await Board.aggregate([
        {
            $match: {
                assignBy : new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "assignBy",
                foreignField: "_id",
                as: "assignBy"
            }
        },
        {
            $unwind: {
                path: "$assignBy",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                boardName: 1,
                tags: 1,
                project: 1,
                assignBy: 1,
                status: 1,
                prioripy: 1,
                startDate: 1,
                endDate: 1,
                assignBy: {
                    _id: 1,
                    avatar: 1,
                    username: 1,
                    fullName: 1
                }
            }
        }
    ])
    if(!boad || boad.length == 0 ) throw new ApiError(404, "boad is required")

    return res.status(200).json(
        new ApiResponse(200,
            boad,
            "task fetched successfully"
        )
        )

})




const updateBoard  = asyncHandler(async(req, res) => {

})


const deleteBoard  = asyncHandler(async(req, res) => {

})


export {
    createBoard,
    getBoard,
    getAllBoard,
    updateBoard,
    deleteBoard
}