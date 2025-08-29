//src/components/ProtectedRoute.jsx


import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    console.log('🚫 المستخدم غير مصرح له، إعادة التوجيه إلى /login');
    return <Navigate to="/login" replace />;
  }

  console.log('✅ المستخدم مصرح له، عرض الصفحة');
  return children;
}

export default ProtectedRoute;
