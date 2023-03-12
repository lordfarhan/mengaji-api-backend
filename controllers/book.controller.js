const Book = require("../models/book.model");

/**
 * Get all books,
 * It will return all books,
 * If query params are provided, it will filter the books,
 * Query params: title, author, authorYearOfDeath, tags, publishers,
 * Publishers can be array or (::) separated string,
 * Tags can be array or (::) separated string.
 *
 * It paginates the results,
 * It order with order query param,
 * Order query param is a string with comma separated key:value pairs.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns json
 */
exports.get = async (req, res, next) => {
	try {
		let { page, limit, order } = req.query;
		let { title, author, authorYearOfDeath, tags, publishers } = req.body;

		// pagination params
		page = parseInt(page) || 1;
		if (page < 1) page = 1;
		limit = parseInt(limit) || 10;
		if (order !== undefined) {
			const parsedOrder = {};
			order.split(",").forEach((item) => {
				const [key, value] = item.split(":");
				parsedOrder[key] = value;
			});
			order = parsedOrder;
		} else {
			order = { _id: "desc" };
		}

		const skip = (page - 1) * limit;
		// define empty filter
		const filter = {};

		if (title) {
			// add title to filter with regex
			filter.title = new RegExp(title, "i");
		}
		if (author) {
			// add author to filter with regex
			filter.author = new RegExp(author, "i");
		}
		if (authorYearOfDeath) {
			// add authorYearOfDeath to filter without regex
			filter.authorYearOfDeath = authorYearOfDeath;
		}
		if (tags) {
			// if tags isn't array, split it with comma separator
			if (!Array.isArray(tags)) {
				tags = tags.split("::");
			}

			// map tags to regex
			tags = tags.map((tag) => {
				return new RegExp(tag, "i");
			});

			// add tags to filter with $in operator
			filter.tags = {
				$in: tags,
			};
		}
		if (publishers) {
			// if publishers isn't array, split it with comma separator
			if (!Array.isArray(publishers)) {
				publishers = publishers.split("::");
			}

			// map publishers to regex
			publishers = publishers.map((tag) => {
				return new RegExp(tag, "i");
			});

			// add publishers to filter with $in operator
			filter.publishers = {
				$in: publishers,
			};
		}

		const books = await Book.find(filter).skip(skip).limit(limit).sort(order);

		return res.status(200).json({
			message: "Books fetched successfully",

			books: books,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

/**
 * Search books,
 * It requires query params,
 * Query params: title, author, authorYearOfDeath, tags, publishers.
 *
 * It paginates the results,
 * It order with order query param,
 * Order query param is a string with comma separated key:value pairs.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns json
 */
exports.search = async (req, res, next) => {
	try {
		let { page, limit, order } = req.query;
		let { title, author, authorYearOfDeath, tags, publishers } = req.body;

		// pagination params
		page = parseInt(page) || 1;
		if (page < 1) page = 1;
		limit = parseInt(limit) || 10;
		if (order) {
			const parsedOrder = {};
			order.split(",").forEach((item) => {
				const [key, value] = item.split(":");
				parsedOrder[key] = value;
			});
			order = parsedOrder;
		} else {
			order = { _id: "desc" };
		}
		const skip = (page - 1) * limit;

		// define empty filter
		const filter = {};

		if (title) {
			// add title to filter with regex
			filter.title = new RegExp(title, "i");
		}
		if (author) {
			// add author to filter with regex
			filter.author = new RegExp(author, "i");
		}
		if (authorYearOfDeath) {
			// add authorYearOfDeath to filter without regex
			filter.authorYearOfDeath = authorYearOfDeath;
		}
		if (tags) {
			// if tags isn't array, split it with comma separator
			if (!Array.isArray(tags)) {
				tags = tags.split("::");
			}

			// map tags to regex
			tags = tags.map((tag) => {
				return new RegExp(tag, "i");
			});

			// add tags to filter with $in operator
			filter.tags = {
				$in: tags,
			};
		}
		if (publishers) {
			// if publishers isn't array, split it with comma separator
			if (!Array.isArray(publishers)) {
				publishers = publishers.split("::");
			}

			// map publishers to regex
			publishers = publishers.map((tag) => {
				return new RegExp(tag, "i");
			});

			// add publishers to filter with $in operator
			filter.publishers = {
				$in: publishers,
			};
		}

		const books = await Book.find(filter).skip(skip).limit(limit).sort(order);

		return res.status(200).json({
			message: "Successful fetch searched books",

			books: books,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

/**
 * Create a book,
 * It will create a book and return the book object,
 * Requires title, author, authorYearOfDeath, tags, publishers.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns json
 */
exports.create = async (req, res, next) => {
	try {
		let { title, author, authorYearOfDeath, tags, publishers } = req.body;

		// if tags isn't array, split it with (::)
		if (!Array.isArray(tags)) {
			tags = tags.split("::");
		}

		// remove non-alphanumeric characters and whitespaces from tags, and make them lowercase
		tags = tags.map((tag) => {
			tag = tag.replaceAll(/\s/g, "");
			return tag.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
		});

		// remove duplicate tags
		tags = [...new Set(tags)];

		// if publishers isn't array, split it with (::)
		if (!Array.isArray(publishers)) {
			publishers = publishers.split("::");
		}

		// trim whitespaces from publishers
		publishers = publishers.map((pub) => {
			pub = pub.replaceAll(/\s/g, "");
			return pub.trim();
		});

		// remove duplicate publishers
		publishers = [...new Set(publishers)];

		// create a new book
		const book = new Book({
			title,
			author,
			authorYearOfDeath,
			tags,
			publishers,
		});

		// save the book
		await book.save();

		return res.status(200).json({
			message: "Book created successfully",
			book: book,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

/**
 * Update a book by id,
 * It will only update the provided fields.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns json
 */
exports.update = async (req, res, next) => {
	try {
		// body is not mandatory, it will update only the provided fields
		let { id, title, author, authorYearOfDeath, tags, publishers } = req.body;
		const update = {};

		if (title) {
			update.title = title;
		}
		if (author) {
			update.author = author;
		}
		if (authorYearOfDeath) {
			update.authorYearOfDeath = authorYearOfDeath;
		}
		if (tags) {
			// if tags isn't array, split it with (::)
			if (!Array.isArray(tags)) {
				tags = tags.split("::");
			}

			// remove non-alphanumeric characters and whitespaces from tags, and make them lowercase
			tags = tags.map((tag) => {
				tag = tag.replaceAll(/\s/g, "");
				return tag.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
			});

			// remove duplicate tags
			tags = [...new Set(tags)];

			update.tags = tags;
		}
		if (publishers) {
			// if publishers isn't array, split it with (::)
			if (!Array.isArray(publishers)) {
				publishers = publishers.split("::");
			}

			// trim whitespaces from publishers
			publishers = publishers.map((pub) => {
				pub = pub.replaceAll(/\s/g, "");
				return pub.trim();
			});

			// remove duplicate publishers
			publishers = [...new Set(publishers)];

			update.publishers = publishers;
		}

		// find and update
		const book = await Book.findByIdAndUpdate(id, update, { returnDocument: "after" });

		if (book) {
			// if book is updated, return success message
			return res.status(200).json({
				message: "Book updated successfully",
				book: book,
			});
		} else {
			// if book is not found, return error message
			return res.status(404).json({
				message: "Book not found",
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

/**
 * Delete a book permanently,
 * It requires id of the book.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns json
 */
exports.delete = async (req, res, next) => {
	try {
		// put id at body, because it's more safety
		const { id } = req.body;

		// find and delete
		const book = await Book.findByIdAndDelete(id);

		if (book) {
			// if book is deleted, return success message
			return res.status(200).json({
				message: "Book deleted successfully",
			});
		} else {
			// if book is not found, return error message
			return res.status(404).json({
				message: "Book not found",
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};
