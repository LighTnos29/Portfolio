const generateToken = require("../utils/generateToken")


module.exports.login = async function (req, res) {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Login code is required",
            });
        }

        if (code === process.env.ADMIN_ACCESS_CODE) {

            let token = generateToken("admin")

            res.cookie("Token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000
            })

            return res.status(200).json({
                success: true,
                message: "Login successful.",
            });

        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid access code",
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error logging in",
            error: error.message,
        });
    }
};
