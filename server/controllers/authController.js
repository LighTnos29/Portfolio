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

            // For cross-origin requests (Vercel frontend to Render backend), use 'none' and 'secure'
            const isProduction = process.env.NODE_ENV === 'production'
            res.cookie("Token", token, {
                httpOnly: true,
                sameSite: isProduction ? "none" : "strict", // 'none' for cross-origin, 'strict' for same-origin
                secure: isProduction, // Requires HTTPS in production
                maxAge: 24 * 60 * 60 * 1000,
                path: '/'
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
        if (process.env.NODE_ENV !== 'production') console.error('Login error:', error.message);
        return res.status(500).json({
            success: false,
            message: "Error logging in",
        });
    }
};

module.exports.logout = async function (req, res) {
    try {
        const isProduction = process.env.NODE_ENV === 'production'
        res.clearCookie("Token", {
            httpOnly: true,
            sameSite: isProduction ? "none" : "strict",
            secure: isProduction,
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful.",
        });
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') console.error('Logout error:', error.message);
        return res.status(500).json({
            success: false,
            message: "Error logging out",
        });
    }
};