import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../shared/PageLayout';
import { Lock, User } from 'lucide-react';
import { API_CONFIG, AUTH_CONFIG } from '../../config/constants';

/**
 * Admin Login Page
 */
const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if running in production without API
    if (API_CONFIG.USE_STATIC_DATA) {
      setError('Админ-панель недоступна на production без настроенного backend API. Запустите приложение локально для доступа к админ-панели.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка входа');
      }

      // Save token to localStorage
      localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, data.token);
      localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(data.user));

      // Redirect to admin panel
      navigate('/admin');

    } catch (err: any) {
      setError(err.message || 'Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-purple-600 mb-4">
                <Lock size={32} />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                Вход в админ-панель
              </h1>
              <p className="text-gray-400 mt-2">Введите ваши учетные данные</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Имя пользователя
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none transition-colors"
                    placeholder="admin"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Пароль
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-red-500 outline-none transition-colors"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Вход...' : 'Войти'}
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>По умолчанию: admin / admin123</p>
              <p className="mt-1">Измените пароль после первого входа</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminLoginPage;
