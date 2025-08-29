// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import AddProduct from './pages/AddProduct';
// import CreateOrder from './pages/CreateOrder';
// import OrdersList from './pages/OrdersList';
// import Login from './pages/Login';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   console.log('✅ داخل مكون App');

//   const [loggedIn, setLoggedIn] = useState(localStorage.getItem('isAuthenticated') === 'true');
//   const handleLogin = () => {
//     localStorage.setItem('isAuthenticated', 'true');
//     setLoggedIn(true);
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* صفحة تسجيل الدخول غير محمية */}
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />

//         {/* المسارات المحمية */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute isAuthenticated={loggedIn}>
//               <OrdersList />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/add"
//           element={
//             <ProtectedRoute isAuthenticated={loggedIn}>
//               <AddProduct />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/order"
//           element={
//             <ProtectedRoute isAuthenticated={loggedIn}>
//               <CreateOrder />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/orders"
//           element={
//             <ProtectedRoute isAuthenticated={loggedIn}>
//               <OrdersList />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;





import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import CreateOrder from './pages/CreateOrder';
import OrdersList from './pages/OrdersList';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  console.log('✅ داخل مكون App');

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setLoggedIn(true);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={loggedIn}>
            <OrdersList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute isAuthenticated={loggedIn}>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order"
        element={
          <ProtectedRoute isAuthenticated={loggedIn}>
            <CreateOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute isAuthenticated={loggedIn}>
            <OrdersList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
