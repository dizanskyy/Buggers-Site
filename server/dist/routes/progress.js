import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
const router = Router();
// Get user progress & stats
router.get('/stats', authMiddleware, (req, res) => {
    try {
        const userId = req.userId;
        const user = db.prepare('SELECT id, username, xp, level, streak, role, avatar FROM users WHERE id = ?').get(userId);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        const completedLessons = db.prepare(`
      SELECT lesson_id, track_id, completed_at, score 
      FROM user_progress 
      WHERE user_id = ? 
      ORDER BY completed_at DESC
    `).all(userId);
        const achievements = db.prepare(`
      SELECT achievement_id, unlocked_at 
      FROM user_achievements 
      WHERE user_id = ?
    `).all(userId);
        const bookmarks = db.prepare(`
      SELECT lesson_id, track_id, created_at 
      FROM user_bookmarks 
      WHERE user_id = ?
    `).all(userId);
        const activity = db.prepare(`
      SELECT date, count, xp_earned 
      FROM daily_activity 
      WHERE user_id = ? 
      ORDER BY date ASC
    `).all(userId);
        // Track breakdown counts
        const trackStats = {};
        for (const item of completedLessons) {
            trackStats[item.track_id] = (trackStats[item.track_id] || 0) + 1;
        }
        return res.json({
            user,
            completedLessons,
            achievements,
            bookmarks,
            activity,
            trackStats
        });
    }
    catch (error) {
        console.error('Stats error:', error);
        return res.status(500).json({ error: 'Ошибка при получении статистики' });
    }
});
// Complete Lesson & Award XP
router.post('/complete', authMiddleware, (req, res) => {
    try {
        const userId = req.userId;
        const { lessonId, trackId, xpBonus = 50, codeSubmission } = req.body;
        if (!lessonId || !trackId) {
            return res.status(400).json({ error: 'Не указаны lessonId или trackId' });
        }
        const existing = db.prepare('SELECT id FROM user_progress WHERE user_id = ? AND lesson_id = ?').get(userId, lessonId);
        const isFirstTime = !existing;
        const earnedXP = isFirstTime ? xpBonus : 10;
        if (isFirstTime) {
            const progId = uuidv4();
            db.prepare(`
        INSERT INTO user_progress (id, user_id, lesson_id, track_id, score, code_submission)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(progId, userId, lessonId, trackId, 100, codeSubmission || '');
        }
        else {
            db.prepare(`
        UPDATE user_progress 
        SET score = 100, code_submission = COALESCE(?, code_submission), completed_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND lesson_id = ?
      `).run(codeSubmission || null, userId, lessonId);
        }
        // Update User XP & Level
        const user = db.prepare('SELECT xp, level FROM users WHERE id = ?').get(userId);
        const newXp = (user.xp || 0) + earnedXP;
        // Level formula: Level = Math.floor(sqrt(XP / 100)) + 1
        const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
        db.prepare('UPDATE users SET xp = ?, level = ? WHERE id = ?').run(newXp, newLevel, userId);
        // Update Daily Activity
        const today = new Date().toISOString().split('T')[0];
        const act = db.prepare('SELECT id, count, xp_earned FROM daily_activity WHERE user_id = ? AND date = ?').get(userId, today);
        if (act) {
            db.prepare('UPDATE daily_activity SET count = count + 1, xp_earned = xp_earned + ? WHERE id = ?').run(earnedXP, act.id);
        }
        else {
            db.prepare('INSERT INTO daily_activity (id, user_id, date, count, xp_earned) VALUES (?, ?, ?, ?, ?)').run(uuidv4(), userId, today, 1, earnedXP);
        }
        // Check & Award achievements
        const totalCompleted = db.prepare('SELECT COUNT(*) as count FROM user_progress WHERE user_id = ?').get(userId);
        const count = totalCompleted.count;
        const newAchievements = [];
        const awardAch = (achId) => {
            const hasAch = db.prepare('SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?').get(userId, achId);
            if (!hasAch) {
                db.prepare('INSERT INTO user_achievements (id, user_id, achievement_id) VALUES (?, ?, ?)').run(uuidv4(), userId, achId);
                newAchievements.push(achId);
            }
        };
        if (count >= 1)
            awardAch('first_step');
        if (count >= 5)
            awardAch('quick_learner');
        if (count >= 15)
            awardAch('code_addict');
        if (count >= 30)
            awardAch('mastery_seeker');
        if (count >= 50)
            awardAch('grandmaster');
        if (trackId === 'gta-mp' && count >= 3)
            awardAch('gta_modder');
        if (trackId === 'cybersecurity' && count >= 3)
            awardAch('cyber_ninja');
        if (trackId === 'gamedev' && count >= 3)
            awardAch('game_architect');
        if (trackId === 'backend' && count >= 3)
            awardAch('backend_sorcerer');
        if (trackId === 'frontend' && count >= 3)
            awardAch('frontend_wizard');
        return res.json({
            success: true,
            earnedXP,
            newXp,
            newLevel,
            levelUp: newLevel > user.level,
            newAchievements,
            message: isFirstTime ? `Урок пройден! +${earnedXP} XP` : `Урок повторен! +${earnedXP} XP`
        });
    }
    catch (error) {
        console.error('Complete error:', error);
        return res.status(500).json({ error: 'Ошибка при сохранении прогресса' });
    }
});
// Toggle Bookmark
router.post('/bookmark', authMiddleware, (req, res) => {
    try {
        const userId = req.userId;
        const { lessonId, trackId } = req.body;
        const existing = db.prepare('SELECT id FROM user_bookmarks WHERE user_id = ? AND lesson_id = ?').get(userId, lessonId);
        if (existing) {
            db.prepare('DELETE FROM user_bookmarks WHERE id = ?').run(existing.id);
            return res.json({ bookmarked: false, message: 'Удалено из закладок' });
        }
        else {
            db.prepare('INSERT INTO user_bookmarks (id, user_id, lesson_id, track_id) VALUES (?, ?, ?, ?)').run(uuidv4(), userId, lessonId, trackId);
            return res.json({ bookmarked: true, message: 'Добавлено в закладки' });
        }
    }
    catch (error) {
        console.error('Bookmark error:', error);
        return res.status(500).json({ error: 'Ошибка при сохранении закладки' });
    }
});
// Leaderboard
router.get('/leaderboard', (req, res) => {
    try {
        const leaders = db.prepare(`
      SELECT id, username, role, avatar, xp, level, streak,
             (SELECT COUNT(*) FROM user_progress WHERE user_id = users.id) as completed_count
      FROM users
      ORDER BY xp DESC
      LIMIT 50
    `).all();
        return res.json({ leaders });
    }
    catch (error) {
        console.error('Leaderboard error:', error);
        return res.status(500).json({ error: 'Ошибка при получении таблицы лидеров' });
    }
});
export default router;
