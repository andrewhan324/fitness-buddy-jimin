require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(cors());

mongoose
.connect(process.env.MONGO_URI)
.catch((err) => console.log(err));

const commentSchema = mongoose.Schema({
  title: String,
  description: String,
});

const Comment = mongoose.model("Comment", commentSchema);



app.get("/", (req, res) => {
  res.send("Express is here");
});

app.post("/create", (req, res) =>{
  Comment.create({
    title: req.body.title,
    description : req.body.description, 
  }).then((doc) => console.log(doc))
  .catch((err) => console.log(err));
});

app.get("/comments", (req, res) => {
  Comment.find().then(items => res.json(items))
  .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  Comment.findByIdAndDelete({ _id: req.params.id})
  .then((doc) => console.log(doc))
  .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  Comment.findByIdAndUpdate(
    { _id: req.params.id},
    {
      title: req.body.title,
      description: req.body.description
    }
  ).then((doc) => console.log(doc))
  .catch((err) => console.log(err));
});

app.listen(3001, function() {
  console.log("Server is running");
});