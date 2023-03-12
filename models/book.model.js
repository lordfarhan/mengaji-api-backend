const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Book = new Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	authorYearOfDeath: {
		type: Number,
		required: true,
	},
	tags: [
		{
			type: String,
		},
	],
	publishers: [
		{
			type: String,
		},
	],
});

module.exports = mongoose.model("Book", Book);
