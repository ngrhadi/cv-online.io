const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
	title: {
		required: true,
		type: String,
	},
	body: {
		required: true,
		type: String,
	},
	markdown: {
		required: true,
		type: String,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	comments: [
		{
			name: String,
			body: String,
			created_at: Date,
		},
	],
});

module.exports = mongoose.model("Article", articleSchema);
