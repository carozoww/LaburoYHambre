import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: "El correo electrónico es requerido" });
        }

        // Buscar usuario en la base de datos de MongoDB
        let user = await User.findOne({ email });

        // Si no existe, creamos el usuario automáticamente para agilizar pruebas
        if (!user) {
            const username = email.split('@')[0] || "Desarrollador";
            user = await User.create({
                username,
                email,
                password: password || "123456"
            });
        } else if (password && user.password && user.password !== password) {
            return res.status(401).json({ message: "Email o contraseña incorrectos" });
        }

        const secret = process.env.JWT_SECRET || "secreto_super_seguro_laburo_y_hambre";
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