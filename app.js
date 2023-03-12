const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/books", require("./routes/book.route"));

mongoose.set("strictQuery", false);
mongoose
	.connect("mongodb://127.0.0.1:27017/mengaji", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		app.listen(3000);
		console.log("connected: " + 3000);
	})
	.catch((error) => {
		console.log("error connecting mongodb: " + error.message);
	});
