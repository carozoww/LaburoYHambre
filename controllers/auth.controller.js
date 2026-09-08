import jwt from "jsonwebtoken";

// Usuario temporal, solo para entender JWT.
// Luego se reemplaza por la búsqueda en MongoDB.
const demoUser = {
    id: "usuario-demo-1",
    email: "prueba@prueba.com",
    password: "123456"
};

export function login(req, res) {
    const { email, password } = req.body;

    if (email !== demoUser.email || password !== demoUser.password) {
        return res.status(401).json({
            message: "Email o contraseña incorrectos"
        });
    }

    const token = jwt.sign(
        { id: demoUser.id },process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN  }
    );

    return res.json({
        auth: true,
        token
    });
}