const express = require('express');
const cors = require('cors');

const app = express();
require("./connection/conn");

const auth = require('./routes/auth');
const list = require('./routes/list');
const path = require("path"); 
app.use(express.json());
app.use(cors());

// API call
app.use("/api/v1", auth);
app.use("/api/v2",list);

app.get("/", (req, res) => { 
    app.use(express.static(path.resolve(__dirname, "frontend", "build"))); 
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); 
  });

app.listen(1000, () => {
    console.log("Server started on port 1000");
});
