const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
const bcrypt = require("bcrypt");

// Helper function to hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Register route
router.post("/register", async (req, res) => {
  try {
    const { email, username, password, lists } = req.body;
    console.log("Register request received:", {
      email,
      username,
      password,
      lists,
    });

    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);
    console.log("Password hashed:", hashedPassword);

    // Create new List items if provided
    let listItems = [];
    if (lists && Array.isArray(lists)) {
      listItems = await List.insertMany(lists.map((item) => new List(item)));
    }

    // Create a new user instance with hashed password
    const user = new User({
      email,
      username,
      password: hashedPassword,
      lists: listItems.map((list) => list._id),
    });
    console.log("User instance created:", user);

    // Save the user to the database
    await user.save();
    console.log("User saved to database");

    // Respond with a success message and the user data
    res.status(201).json({ message: "Sign Up Successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", { email });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    res.status(200).json({ message: "SignIn successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
