import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token requerido. Use Authorization: Bearer <token>"
        });
    }

    const token = authorization.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = payload.id;

    next();
    } catch {
        return res.status(401).json({
            message: "Token inválido o vencido"
        });
    }
}

export default authenticate;