import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'academy-super-secret-key-2026';
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Необходима авторизация' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    }
    catch (err) {
        res.status(401).json({ error: 'Недействительный или истекший токен' });
    }
}
