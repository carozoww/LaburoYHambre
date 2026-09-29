import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { verifyPassword } from "../services/user.service.js";

export async function login(req, res, next) {
    try {
        const { email, password } = req.body || {};

        if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password) {
            return res.status(400).json({ message: "Correo y contraseña requeridos" });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');

        if (!user || !await verifyPassword(password, user.password)) {
            return res.status(401).json({ message: "Email o contraseña incorrectos" });
        }

        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRES_IN || "24h";

        const token = jwt.sign(
            { id: user._id },
            secret,
            { expiresIn }
        );

        return res.json({
            auth: true,
            token,
            user: {
                id: user._id,
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        next(err);
    }
}
