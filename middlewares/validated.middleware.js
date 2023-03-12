const { body, validationResult } = require("express-validator");

const errorFormat = ({ location, msg, param, value, nestedErrors }) => {
	return `${param}: ${msg}`;
};

const validated = (req, res, next) => {
	const errors = validationResult(req).formatWith(errorFormat);

	if (!errors.isEmpty()) {
		return res.status(422).json({
			message: errors.array().join(", "),
		});
	}
	next();
};

module.exports = validated;
