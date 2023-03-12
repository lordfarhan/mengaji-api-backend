const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const validated = require("../middlewares/validated.middleware");
const controller = require("../controllers/book.controller");

router.get("/", controller.get);
router.post("/search", controller.search);
router.post(
	"/add",
	[
		body("title").notEmpty().withMessage("Title is required"),
		body("author").notEmpty().withMessage("Author is required"),
		body("authorYearOfDeath")
			.notEmpty()
			.isNumeric()
			.withMessage("Author year of death is required and must be a number"),
		body("tags").notEmpty().withMessage("Tags is required"),
		body("publishers").notEmpty().withMessage("Publisher is required"),
	],
	controller.create
);
router.patch(
	"/edit",
	[
		body("id").notEmpty().withMessage("Id is required"),
		body("authorYearOfDeath").isNumeric().withMessage("Author year of death must be a number"),
	],
	[validated],
	controller.update
);
router.delete(
	"/delete",
	[body("id").notEmpty().withMessage("Id is required")],
	[validated],
	controller.delete
);

module.exports = router;
