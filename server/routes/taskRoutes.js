const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// create a new task
router.post('/', async (req, res, next) => {
    try{
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
});

//Router for GET all tasks. With Filtering, Searching and sorting
router.get('/', async (req, res, next) => {
    try{
        const filter = {};
        const taskStatus = req.query.taskStatus || "all";

        if (taskStatus === "active") {
            filter.completed = false;
        } else if (taskStatus === "completed") {
            filter.completed = true;
        } else if (taskStatus !== "all") {
            return res.status(400).json({
                success: false,
                message: "taskStatus must be all, active, or completed"
            });
        }

        const tasks = await Task.find(filter)
            .sort(req.query.sort || "title");

        res.status(200).json({ 
            success: true, 
            count: tasks.length,
            data: tasks });
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try{
        if (typeof req.body.completed !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "completed must be a boolean"
            });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
});

//delete task
router.delete("/:id", async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;