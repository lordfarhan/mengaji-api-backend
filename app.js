const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/books", require("./routes/book.route"));

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
mongoose.set("strictQuery", false);
mongoose
	.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		app.listen(port);
		console.log("connected: " + port);
	})
	.catch((error) => {
		console.log("error connecting mongodb: " + error.message);
	});
