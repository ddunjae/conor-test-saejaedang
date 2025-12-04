import React, { useState } from 'react';
import { CornerFrame } from '../common/KoreanOrnament';

interface AdminLoginProps {
  onLogin: (username: string, password: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await onLogin(username, password);
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-korean-paper via-hanok-ivory to-korean-paper flex items-center justify-center p-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-paper-texture"></div>
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-saejaedang-primary/5 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-hanok-gold/10 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-[2rem] p-10 shadow-ceramic border border-saejaedang-light/10 animate-slide-up">
          <CornerFrame position="top-left" size="sm" className="opacity-30" />
          <CornerFrame position="bottom-right" size="sm" className="opacity-30" />

          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-hanok shadow-hanok mb-4">
              <span className="text-2xl text-hanok-ivory font-display font-bold">
                새
              </span>
            </div>

            <h1 className="text-3xl font-display font-bold text-saejaedang-deep mb-2">
              새재당 관리자
            </h1>
            <p className="text-sm text-saejaedang-light">
              Admin Dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-korean-red/10 border border-korean-red/20 rounded-hanok p-4 animate-slide-up">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-korean-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm text-korean-red font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-saejaedang-deep mb-2">
                아이디
                <span className="text-xs text-saejaedang-light ml-2">Username</span>
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all duration-200 outline-none bg-hanok-ivory/30"
                placeholder="관리자 아이디를 입력하세요"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-saejaedang-deep mb-2">
                비밀번호
                <span className="text-xs text-saejaedang-light ml-2">Password</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-hanok border-2 border-saejaedang-light/20 focus:border-saejaedang-primary focus:ring-2 focus:ring-saejaedang-primary/20 transition-all duration-200 outline-none bg-hanok-ivory/30"
                placeholder="비밀번호를 입력하세요"
                disabled={isLoading}
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-saejaedang-light/20 text-saejaedang-primary focus:ring-saejaedang-primary/20"
                />
                <span className="ml-2 text-sm text-saejaedang-medium">로그인 상태 유지</span>
              </label>

              <a href="#" className="text-sm text-saejaedang-primary hover:text-saejaedang-deep transition-colors duration-200">
                비밀번호 찾기
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-6 py-4 rounded-ceramic font-medium text-hanok-ivory transition-all duration-300 ${
                isLoading
                  ? 'bg-saejaedang-light cursor-not-allowed'
                  : 'bg-gradient-hanok hover:shadow-ceramic'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-hanok-ivory" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>로그인 중...</span>
                </span>
              ) : (
                '로그인'
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-saejaedang-light/10">
            <p className="text-xs text-center text-saejaedang-light">
              새재당 관리자 시스템은 인증된 사용자만 접근할 수 있습니다.
            </p>
          </div>
        </div>

        {/* Decorative bottom text */}
        <div className="text-center mt-6">
          <p className="text-sm text-saejaedang-light">
            © {new Date().getFullYear()} 새재당 (Saejaedang)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
