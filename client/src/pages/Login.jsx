import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ نستخدمه فعليًا الآن
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ إنشاء التوجيه

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('🔍 محاولة تسجيل الدخول:', { username, password });

    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isAuthenticated', 'true');
      onLogin(); // ✅ تحديث الحالة في App.js
      console.log('✅ تسجيل الدخول ناجح، التوجيه إلى الصفحة الرئيسية');
      navigate('/'); // ✅ التوجيه بعد الدخول
    } else {
      console.warn('❌ بيانات الدخول غير صحيحة');
      alert('❌ اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 تسجيل الدخول</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">دخول</button>
      </form>
    </div>
  );
};

export default Login;
