import express from "express";
import {
  getTask,
  createdTask,
  updateTask,
  deleteTask,
  getTaskById,
  searchByTaskByTitle
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTask);
router.post("/",createdTask);
router.get("/search",searchByTaskByTitle)
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/:id", getTaskById);


export default router;
