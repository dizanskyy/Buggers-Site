import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { User, Lock, Mail, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRegister?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccessRegister }) => {
  const { login, register, loginAsGuest } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('developer');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (isRegister) {
      if (!username || !email || !password) {
        setError('Пожалуйста, заполните все поля');
        setIsLoading(false);
        return;
      }
      const res = await register(username, email, password, role);
      if (!res.success) {
        setError(res.error || 'Ошибка при регистрации');
      } else {
        onClose();
        if (onSuccessRegister) onSuccessRegister();
      }
    } else {
      if (!username || !password) {
        setError('Введите логин/email и пароль');
        setIsLoading(false);
        return;
      }
      const res = await login(username, password);
      if (!res.success) {
        setError(res.error || 'Неверный логин или пароль');
      } else {
        onClose();
      }
    }
    setIsLoading(false);
  };

  const handleGuest = () => {
    loginAsGuest();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-white text-black font-bold text-xs flex items-center justify-center font-mono">
            B
          </div>
          <span>{isRegister ? 'Регистрация в Академии' : 'Вход в профиль'}</span>
        </div>
      }
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* Toggle Mode */}
        <div className="grid grid-cols-2 p-1 bg-[#18181d] rounded-xl border border-[#26262e] text-xs">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(''); }}
            className={`py-1.5 rounded-lg font-medium transition-all ${
              !isRegister ? 'bg-zinc-800 text-white shadow-sm font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Вход
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(''); }}
            className={`py-1.5 rounded-lg font-medium transition-all ${
              isRegister ? 'bg-zinc-800 text-white shadow-sm font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Регистрация
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-zinc-400 font-medium mb-1">Имя пользователя / Никнейм</label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="например, alex_dev"
                className="w-full bg-[#16161a] border border-[#272730] focus:border-zinc-400 rounded-lg pl-9 pr-3 py-2 text-white placeholder-zinc-600 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-zinc-400 font-medium mb-1">Email адрес</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-[#16161a] border border-[#272730] focus:border-zinc-400 rounded-lg pl-9 pr-3 py-2 text-white placeholder-zinc-600 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-zinc-400 font-medium mb-1">Пароль</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#16161a] border border-[#272730] focus:border-zinc-400 rounded-lg pl-9 pr-3 py-2 text-white placeholder-zinc-600 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-zinc-400 font-medium mb-1">Основное направление</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-[#16161a] border border-[#272730] focus:border-zinc-400 rounded-lg px-3 py-2 text-white focus:outline-none transition-colors"
              >
                <option value="developer">Fullstack / Frontend Разработчик</option>
                <option value="architect">Backend & Архитектор</option>
                <option value="security_specialist">Кибербезопасность & AppSec</option>
                <option value="gamedev">GameDev Разработчик (Unity/UE5)</option>
                <option value="gta_modder">GTA Multiplayer Dev (RAGE/FiveM/alt:V)</option>
                <option value="devops">DevOps & Системный инженер</option>
              </select>
            </div>
          )}

          <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
            {isRegister ? 'Зарегистрироваться' : 'Войти в профиль'}
          </Button>
        </form>

        <div className="relative flex items-center justify-center my-3">
          <div className="border-t border-[#22222a] w-full" />
          <span className="bg-[#121215] px-2 text-[10px] uppercase font-mono text-zinc-500 absolute">или</span>
        </div>

        <Button
          type="button"
          variant="secondary"
          className="w-full text-xs"
          onClick={handleGuest}
        >
          Продолжить как гость (Демо-профиль)
        </Button>
      </div>
    </Modal>
  );
};
