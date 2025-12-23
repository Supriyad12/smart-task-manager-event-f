const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
 
// GET http://localhost:3000/api/task
router.get("/", authMiddleware, taskController.getTasks);
 
// POST http://localhost:3000/api/task
router.post("/", authMiddleware, taskController.createTask);
 
// POST http://localhost:3000/api/task/id
router.get("/:id", authMiddleware, taskController.getTaskById);
 
// POST http://localhost:3000/api/task/id
router.put("/:id", authMiddleware, taskController.updateTask);
 
// POST http://localhost:3000/api/task/id
router.delete("/:id", authMiddleware, taskController.deleteTask);
 
module.exports = router;
 
 