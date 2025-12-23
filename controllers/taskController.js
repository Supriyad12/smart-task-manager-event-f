const Task = require("../models/Task");
 
// Create Task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority } = req.body;
 
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      userId: req.user.id //READ FROM JWT
    });
 
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Task title already exists for this user"
      });
    }
    next(error);
  }
};
 
// Get All Tasks
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id, //READ FROM JWT
      isDeleted: false
    }).sort({ createdAt: -1 });
 
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};
 
// Get Tasks By id
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id, //READ FROM JWT
      isDeleted: false
    });
 
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }
 
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};
 
// Update task
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
        isDeleted: false
      },
      req.body,
      { new: true, runValidators: true }
    );
 
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or unauthorized"
      });
    }
 
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Task title already exists for this user"
      });
    }
    next(error);
  }
};
 
// Soft delete task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
        isDeleted: false
      },
      { isDeleted: true },
      { new: true }
    );
 
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or already deleted"
      });
    }
 
    res.json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
 