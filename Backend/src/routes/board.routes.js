import { Router } from "express";
import { 
    createBoard,
    getBoard,
    getAllBoard,
    getBoardById,
    updateBoard,
    deleteBoard,

} from "../controllers/boards.controllers.js"
const router = Router()

router.route("/createBoard/:userId").post(createBoard)


export default router
