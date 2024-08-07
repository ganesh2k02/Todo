const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Todo", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB server connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

connectDB();
