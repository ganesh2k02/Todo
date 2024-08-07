const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

// Endpoint to add a new task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);

    if (existingUser) {
      const list = new List({ title, body, user: existingUser._id });
      await list.save();

      // Add the list to the user's lists array
      existingUser.lists.push(list._id);
      await existingUser.save();

      res.status(200).json({ list });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    // console.error("Error adding task:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.put("/updateTask/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    // Find the task by ID
    const list = await List.findById(id);

    if (list) {
      // Update the title and body
      list.title = title || list.title;
      list.body = body || list.body;

      // Save the updated task
      await list.save();
      res.status(200).json({ list });
    } else {
      res.status(404).json({ message: "Task not found." });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


//Delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find and remove the task
    const list = await List.findByIdAndDelete(id);

    if (list) {
      // Remove the task ID from the user's lists array
      await User.updateMany({ lists: id }, { $pull: { lists: id } });

      res.status(200).json({ message: "Task deleted successfully." });
    } else {
      res.status(404).json({ message: "Task not found." });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

//Get Task
router.get("/getTask/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find all tasks associated with the user ID and sort them by createdAt in descending order
    const tasks = await List.find({ user: id })
                            .populate('user', 'email username')
                            .sort({ createdAt: -1 });

    if (tasks.length > 0) {
      res.status(200).json({ tasks });
    } else {
      res.status(404).json({ message: "No tasks found for this user." });
    }
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});



module.exports = router;
