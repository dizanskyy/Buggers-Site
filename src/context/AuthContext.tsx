import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (loginInput: string, passwordInput: string) => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  loginAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_USER: User = {
  id: 'guest-user-1',
  username: 'Cadet_Developer',
  email: 'cadet@buggers.pro',
  role: 'developer',
  avatar: 'code',
  bio: 'Изучаю программирование и архитектуру в Buggers Academy.',
  xp: 350,
  level: 2,
  streak: 3,
  created_at: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('academy_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('academy_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(GUEST_USER);
      }
    } else {
      // Default to guest profile so user immediately sees rich UI
      setUser(GUEST_USER);
      localStorage.setItem('academy_user', JSON.stringify(GUEST_USER));
    }
    setIsLoading(false);
  }, []);

  const login = async (loginInput: string, passwordInput: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: loginInput, password: passwordInput })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Ошибка входа' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('academy_token', data.token);
      localStorage.setItem('academy_user', JSON.stringify(data.user));
      return { success: true };
    } catch {
      // Fallback local mock login
      const mockUser: User = {
        id: 'user-' + Date.now(),
        username: loginInput,
        email: loginInput.includes('@') ? loginInput : `${loginInput}@academy.pro`,
        role: 'developer',
        avatar: 'code',
        xp: 150,
        level: 1,
        streak: 1,
        created_at: new Date().toISOString()
      };
      setUser(mockUser);
      localStorage.setItem('academy_user', JSON.stringify(mockUser));
      return { success: true };
    }
  };

  const register = async (username: string, email: string, password: string, role: UserRole = 'developer') => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Ошибка регистрации' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('academy_token', data.token);
      localStorage.setItem('academy_user', JSON.stringify(data.user));
      return { success: true };
    } catch {
      const newUser: User = {
        id: 'user-' + Date.now(),
        username,
        email,
        role,
        avatar: 'code',
        xp: 100,
        level: 1,
        streak: 1,
        created_at: new Date().toISOString()
      };
      setUser(newUser);
      localStorage.setItem('academy_user', JSON.stringify(newUser));
      return { success: true };
    }
  };

  const logout = () => {
    setUser(GUEST_USER);
    setToken(null);
    localStorage.removeItem('academy_token');
    localStorage.setItem('academy_user', JSON.stringify(GUEST_USER));
  };

  const loginAsGuest = () => {
    setUser(GUEST_USER);
    localStorage.setItem('academy_user', JSON.stringify(GUEST_USER));
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('academy_user', JSON.stringify(updated));

    if (token) {
      try {
        await fetch('/api/auth/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });
      } catch (err) {
        console.error('Failed to sync profile to server:', err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user && user.id !== 'guest-user-1',
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      loginAsGuest
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
