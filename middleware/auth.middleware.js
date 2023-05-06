var jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");
const authMiddleware = async (req, res, next) => {
	const token = req.headers?.authorization?.split(" ")[1];
	if (token) {
		var decoded = jwt.verify(token, "ironman");
		let isAdmin = await UserModel.find({ _id: decoded.userID });
		isAdmin = isAdmin[0].isAdmin;
		if (decoded && isAdmin) {
			next();
		} else {
			res.status(404).send({
				msg: "you are not admin",
			});
		}
	} else {
		res.status(404).send({
			msg: "please login first",
		});
	}
};

module.exports = { authMiddleware };
