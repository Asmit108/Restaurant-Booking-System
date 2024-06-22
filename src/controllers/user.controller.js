// controllers/userController.js
const userService = require('../services/user.service');
const bcrypt = require('bcrypt');

class userController {
    static register(req, res) {
        try {
            const user = userService.createUser(req.body);
            return res.status(200).send({ message: "register success" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static login(req, res) {
        try {
            const { password, emailid, name } = req.body;
            const user = userService.getUserByEmail(emailid);
            if (!user) {
                return res.status(404).send({ message: `user not found with email: ${email}` });
            }
            const isPasswordValid = bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).send({ message: "Invalid Password..." });
            }

            return res.status(200).send({ message: "login success" });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}

module.exports = userController;
