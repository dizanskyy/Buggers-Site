import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'academy-super-secret-key-2026';

// Register
router.post('/register', (req, res) => {
  try {
    const { username, email, password, role, avatar } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Пожалуйста, заполните все обязательные поля' });
    }

    if (username.length < 3) {
      return res.status(400).json({ error: 'Имя пользователя должно содержать минимум 3 символа' });
    }

    if (password.length < 4) {
      return res.status(400).json({ error: 'Пароль должен содержать минимум 4 символа' });
    }

    const existingUser = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(username, email);
    if (existingUser) {
      return res.status(409).json({ error: 'Пользователь с таким именем или email уже существует' });
    }

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);
    const id = uuidv4();
    const today = new Date().toISOString().split('T')[0];

    db.prepare(`
      INSERT INTO users (id, username, email, password_hash, role, avatar, xp, level, streak, last_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, username, email, password_hash, role || 'developer', avatar || 'code', 0, 1, 1, today);

    // Initial welcome achievement
    const achId = uuidv4();
    db.prepare(`
      INSERT INTO user_achievements (id, user_id, achievement_id)
      VALUES (?, ?, ?)
    `).run(achId, id, 'welcome_onboard');

    const token = jwt.sign({ id, role: role || 'developer' }, JWT_SECRET, { expiresIn: '30d' });

    const user = db.prepare('SELECT id, username, email, role, avatar, bio, xp, level, streak, created_at FROM users WHERE id = ?').get(id);

    return res.status(201).json({
      user,
      token,
      message: 'Регистрация успешно завершена'
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Ошибка сервера при регистрации' });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ error: 'Введите логин/email и пароль' });
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ? OR email = ?').get(login, login) as any;
    if (!user) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }

    // Check streak
    const today = new Date().toISOString().split('T')[0];
    let newStreak = user.streak || 1;
    if (user.last_active) {
      const last = new Date(user.last_active);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    }

    db.prepare('UPDATE users SET last_active = ?, streak = ? WHERE id = ?').run(today, newStreak, user.id);

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });

    const { password_hash, ...safeUser } = user;
    safeUser.streak = newStreak;
    safeUser.last_active = today;

    return res.json({
      user: safeUser,
      token,
      message: 'Успешный вход'
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Ошибка сервера при входе' });
  }
});

// Get Current User Profile
router.get('/me', authMiddleware, (req: AuthRequest, res) => {
  try {
    const user = db.prepare('SELECT id, username, email, role, avatar, bio, xp, level, streak, created_at, last_active FROM users WHERE id = ?').get(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    return res.json({ user });
  } catch (error: any) {
    console.error('Get me error:', error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Update Profile
router.put('/profile', authMiddleware, (req: AuthRequest, res) => {
  try {
    const { role, avatar, bio } = req.body;
    db.prepare('UPDATE users SET role = COALESCE(?, role), avatar = COALESCE(?, avatar), bio = COALESCE(?, bio) WHERE id = ?')
      .run(role, avatar, bio, req.userId);

    const user = db.prepare('SELECT id, username, email, role, avatar, bio, xp, level, streak, created_at FROM users WHERE id = ?').get(req.userId);
    return res.json({ user, message: 'Профиль обновлен' });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return res.status(500).json({ error: 'Ошибка при обновлении профиля' });
  }
});

export default router;
