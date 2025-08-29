// import React, { useState, useEffect } from 'react';
// import './CreateOrder.css';

// const CreateOrder = () => {
//   const [buyerName, setBuyerName] = useState('');
//   const [products, setProducts] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showInvoice, setShowInvoice] = useState(false);

//   // 📦 جلب المنتجات من قاعدة البيانات
//   useEffect(() => {
//     fetch('http://localhost:5000/api/products')
//       .then(res => res.json())
//       .then(data => {
//         console.log('📦 المنتجات المستلمة:', data);
//         setProducts(data);
//       })
//       .catch(err => {
//         console.error('❌ فشل في جلب المنتجات:', err);
//       });
//   }, []);

//   // 🧮 حساب السعر الإجمالي
//   useEffect(() => {
//     const total = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   }, [selectedItems]);

//   // ✅ إضافة منتج
//   const handleSelectProduct = (productId) => {
//     const product = products.find(p => p._id === productId);
//     if (!product) return;

//     const exists = selectedItems.find(item => item.productId === productId);
//     if (exists) return;

//     setSelectedItems([...selectedItems, {
//       productId: product._id,
//       name: product.productName,
//       price: product.salePrice,
//       quantity: 1,
//       available: product.quantity,
//       image: product.imageUrl
//     }]);
//   };

//   // 🔄 تغيير الكمية
//   const handleQuantityChange = (productId, value) => {
//     const updated = selectedItems.map(item => {
//       if (item.productId === productId) {
//         const newQty = Math.min(value, item.available);
//         return { ...item, quantity: newQty };
//       }
//       return item;
//     });
//     setSelectedItems(updated);
//   };

//   // 🚀 إرسال الطلب
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!buyerName || selectedItems.length === 0) {
//       alert('يرجى إدخال اسم المشتري واختيار المنتجات');
//       return;
//     }

//     const payload = {
//       buyerName,
//       products: selectedItems.map(item => ({
//         productId: item.productId,
//         quantity: item.quantity
//       }))
//     };

//     try {
//       const res = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       const result = await res.json();
//       console.log('📬 استجابة الخادم:', result);
//       alert('✅ تم حفظ الطلب بنجاح');

//       setBuyerName('');
//       setSelectedItems([]);
//       setTotalPrice(0);
//       setShowInvoice(false);
//     } catch (err) {
//       console.error('❌ فشل في إرسال الطلب:', err);
//       alert('حدث خطأ أثناء حفظ الطلب');
//     }
//   };

//   // 🔍 فلترة المنتجات
//   const filteredProducts = products.filter(p =>
//     p.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="create-order-container">
//       <h2>🧾 إنشاء طلب جديد</h2>

//       <form onSubmit={handleSubmit}>
//         <label>👤 اسم المشتري:</label>
//         <input
//           type="text"
//           value={buyerName}
//           onChange={(e) => setBuyerName(e.target.value)}
//           placeholder="مثلاً: محمد بن عيسى"
//         />

//         <label>🔍 ابحث عن المنتج:</label>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="اسم المنتج..."
//         />

//         <label>🛒 المنتجات المتوفرة:</label>
//         <div className="product-list">
//           {filteredProducts.map(product => (
//             <div key={product._id} className="product-card">
//               {product.imageUrl && (
//                 <img src={product.imageUrl} alt={product.productName} className="product-image" />
//               )}
//               <p><strong>{product.productName}</strong></p>
//               <p>💰 السعر: {product.salePrice} دج</p>
//               <p>📦 الكمية: {product.quantity}</p>
//               {product.quantity <= 5 && <p className="warning">⚠️ الكمية منخفضة</p>}
//               <button type="button" onClick={() => handleSelectProduct(product._id)}>➕ إضافة</button>
//             </div>
//           ))}
//         </div>

//         <label>📋 المنتجات المختارة:</label>
//         <div className="selected-items">
//           {selectedItems.map(item => (
//             <div key={item.productId} className="selected-item">
//               {item.image && (
//                 <img src={item.image} alt={item.name} className="selected-image" />
//               )}
//               <p>{item.name}</p>
//               <input
//                 type="number"
//                 min="1"
//                 max={item.available}
//                 value={item.quantity}
//                 onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
//               />
//               <span>💰 {item.price * item.quantity} دج</span>
//             </div>
//           ))}
//         </div>

//         <p className="total">📊 السعر الإجمالي: <strong>{totalPrice} دج</strong></p>

//         <div className="action-buttons">
//           <button type="submit">🚀 تأكيد الطلب</button>
//           <button type="button" onClick={() => setShowInvoice(true)}>🧾 عرض الفاتورة</button>
//         </div>
//       </form>

//       {showInvoice && (
//         <div className="invoice-preview">
//           <h3>🧾 فاتورة الطلب</h3>
//           <p>👤 المشتري: {buyerName}</p>
//           <p>📅 التاريخ: {new Date().toLocaleDateString()}</p>
//           <table>
//             <thead>
//               <tr>
//                 <th>📦 المنتج</th>
//                 <th>🔢 الكمية</th>
//                 <th>💰 السعر</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedItems.map(item => (
//                 <tr key={item.productId}>
//                   <td>{item.name}</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.price * item.quantity} دج</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <p className="total">📊 الإجمالي: <strong>{totalPrice} دج</strong></p>
//           <button onClick={() => window.print()}>🖨️ طباعة الفاتورة</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateOrder;


// // 📦 استيراد المكتبات
// import React, { useState, useEffect } from 'react';
// import './CreateOrder.css';
// import { Link } from 'react-router-dom';

// // 🧾 مكون إنشاء الطلب
// const CreateOrder = () => {
//   // 🧠 الحالات المحلية
//   const [buyerName, setBuyerName] = useState('');
//   const [products, setProducts] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showInvoice, setShowInvoice] = useState(false);

//   // 📥 جلب المنتجات من السيرفر عند تحميل الصفحة
//   useEffect(() => {
//     fetch('http://localhost:5000/api/products')
//       .then(res => res.json())
//       .then(data => setProducts(Array.isArray(data) ? data : []))
//       .catch(err => console.error('❌ فشل في جلب المنتجات:', err));
//   }, []);

//   // 🧮 حساب السعر الإجمالي عند تغيير المنتجات المختارة
//   useEffect(() => {
//     const total = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   }, [selectedItems]);

//   // ➕ إضافة منتج إلى السلة
//   const handleSelectProduct = (productId) => {
//     const product = products.find(p => p._id === productId);
//     if (!product) return;

//     const exists = selectedItems.find(item => item.productId === productId);
//     if (exists) return;

//     const imageUrl = product.imagePath
//       ? `http://localhost:5000/${product.imagePath.replace(/^\/?/, '')}`
//       : null;

//     const newItem = {
//       productId: product._id,
//       name: product.productName,
//       price: product.salePrice,
//       quantity: 1,
//       available: product.quantity,
//       image: imageUrl
//     };

//     setSelectedItems([...selectedItems, newItem]);
//   };

//   // 🔄 تعديل كمية منتج داخل السلة
//   const handleQuantityChange = (productId, value) => {
//     const updated = selectedItems.map(item =>
//       item.productId === productId
//         ? { ...item, quantity: Math.min(value, item.available) }
//         : item
//     );
//     setSelectedItems(updated);
//   };

//   // 📤 إرسال الطلب إلى السيرفر
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!buyerName || selectedItems.length === 0) {
//       alert('يرجى إدخال اسم المشتري واختيار المنتجات');
//       return;
//     }

//     const payload = {
//       buyerName,
//       products: selectedItems.map(item => ({
//         productId: item.productId,
//         quantity: item.quantity
//       }))
//     };

//     try {
//       await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       alert('✅ تم حفظ الطلب بنجاح');
//       setShowInvoice(true);
//     } catch (err) {
//       console.error('❌ فشل في إرسال الطلب:', err);
//       alert('حدث خطأ أثناء حفظ الطلب');
//     }
//   };

//   // 🖨️ طباعة الفاتورة
//   const handlePrintInvoice = () => {
//     setShowInvoice(true);
//     setTimeout(() => window.print(), 300);
//   };

//   // 🔍 فلترة المنتجات حسب البحث
//   const filteredProducts = products.filter(p =>
//     p.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // 🖼️ واجهة المستخدم
//   return (
//     <div className="create-order-container">
//       <h2>🧾 إنشاء طلب جديد</h2>

//       {/* 📝 نموذج إدخال البيانات */}
//       <form onSubmit={handleSubmit}>
//         {/* 👤 اسم المشتري */}
//         <label>👤 اسم المشتري:</label>
//         <input
//           type="text"
//           value={buyerName}
//           onChange={(e) => setBuyerName(e.target.value)}
//           placeholder="مثلاً: محمد بن عيسى"
//         />

//         {/* 🔍 البحث عن المنتج */}
//         <label>🔍 ابحث عن المنتج:</label>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="اسم المنتج..."
//         />

//         {/* 🧺 عرض المنتجات */}
//         <div className="product-list">
//           {filteredProducts.map(product => (
//             <div key={product._id} className="product-card">
//               {product.imagePath && (
//                 <img
//                   src={`http://localhost:5000/${product.imagePath.replace(/^\/?/, '')}`}
//                   alt={product.productName}
//                   className="product-image"
//                 />
//               )}
//               <p><strong>{product.productName}</strong></p>
//               <p>💰 السعر: {product.salePrice} دج</p>
//               <p>📦 الكمية: {product.quantity}</p>
//               {product.quantity <= 5 && <p className="warning">⚠️ الكمية منخفضة</p>}
//               <button type="button" onClick={() => handleSelectProduct(product._id)}>➕ إضافة</button>
//             </div>
//           ))}
//         </div>

//         {/* 🔗 زر التنقل إلى سجل الطلبات */}
//         <Link to="/orders">
//           <button type="button" className="go-to-orders-btn">📋 عرض سجل الطلبات</button>
//         </Link>

//         {/* 🛒 المنتجات المختارة */}
//         <div className="selected-items">
//           {selectedItems.map(item => (
//             <div key={item.productId} className="selected-item">
//               {item.image && (
//                 <img src={item.image} alt={item.name} className="selected-image" />
//               )}
//               <p>{item.name}</p>
//               <input
//                 type="number"
//                 min="1"
//                 max={item.available}
//                 value={item.quantity}
//                 onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
//               />
//               <span>💰 {item.price * item.quantity} دج</span>
//             </div>
//           ))}
//         </div>

//         {/* 💰 السعر الإجمالي */}
//         <p className="total">📊 السعر الإجمالي: <strong>{totalPrice} دج</strong></p>

//         {/* ✅ أزرار الإجراء */}
//         <div className="action-buttons">
//           <button type="submit">🚀 تأكيد الطلب</button>
//           <button type="button" onClick={handlePrintInvoice}>🖨️ طباعة الفاتورة</button>
//         </div>
//       </form>

//       {/* 🧾 عرض الفاتورة بعد التأكيد */}
//       {showInvoice && (
//         <div id="invoice-section" className="invoice-preview">
//           <h3>🧾 فاتورة الطلب</h3>
//           <p>👤 المشتري: {buyerName}</p>
//           <p>📅 التاريخ: {new Date().toLocaleDateString()}</p>

//           {/* 📊 جدول الفاتورة */}
//           <table>
//             <thead>
//               <tr>
//                 <th>🖼️ صورة</th>
//                 <th>📦 المنتج</th>
//                 <th>🔢 الكمية</th>
//                 <th>💰 السعر</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedItems.map(item => (
//                 <tr key={item.productId}>
//                   <td>
//                     {item.image && (
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         style={{
//                           width: '60px',
//                           height: '60px',
//                           objectFit: 'contain',
//                           borderRadius: '6px'
//                         }}
//                       />
//                     )}
//                   </td>
//                   <td>{item.name}</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.price * item.quantity} دج</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* 💰 الإجمالي */}
//           <p className="total">📊 الإجمالي: <strong>{totalPrice} دج</strong></p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateOrder;

/*--------------------------------------------------//-------------------------------------------------------*/

// // 📦 استيراد المكتبات
// import React, { useState, useEffect } from 'react';
// import './CreateOrder.css';
// import { Link } from 'react-router-dom';

// // 🧾 مكون إنشاء الطلب
// const CreateOrder = () => {
//   // 🧠 الحالات المحلية
//   const [buyerName, setBuyerName] = useState('');
//   const [products, setProducts] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showInvoice, setShowInvoice] = useState(false);

//   // 📥 جلب المنتجات من السيرفر عند تحميل الصفحة
//   useEffect(() => {
//     fetch('http://localhost:5000/api/products')
//       .then(res => res.json())
//       .then(data => setProducts(Array.isArray(data) ? data : []))
//       .catch(err => console.error('❌ فشل في جلب المنتجات:', err));
//   }, []);

//   // 🧮 حساب السعر الإجمالي عند تغيير المنتجات المختارة
//   useEffect(() => {
//     const total = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   }, [selectedItems]);

//   // ➕ إضافة منتج إلى السلة
//   const handleSelectProduct = (productId) => {
//     const product = products.find(p => p._id === productId);
//     if (!product) return;

//     const exists = selectedItems.find(item => item.productId === productId);
//     if (exists) return;

//     const imageUrl = product.imagePath
//       ? `http://localhost:5000/${product.imagePath.replace(/^\/?/, '')}`
//       : null;

//     const newItem = {
//       productId: product._id,
//       name: product.productName,
//       price: product.salePrice,
//       quantity: 1,
//       available: product.quantity,
//       image: imageUrl
//     };

//     setSelectedItems([...selectedItems, newItem]);
//   };

//   // 🔄 تعديل كمية منتج داخل السلة
//   const handleQuantityChange = (productId, value) => {
//     const updated = selectedItems.map(item =>
//       item.productId === productId
//         ? { ...item, quantity: Math.min(value, item.available) }
//         : item
//     );
//     setSelectedItems(updated);
//   };

//   // 📤 إرسال الطلب إلى السيرفر
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!buyerName || selectedItems.length === 0) {
//       alert('يرجى إدخال اسم المشتري واختيار المنتجات');
//       return;
//     }

//     // 🧮 تجهيز البيانات الكاملة لكل منتج
//     const payload = {
//       buyerName,
//       products: selectedItems.map(item => {
//         const productData = products.find(p => p._id === item.productId);
//         const costPrice = productData?.costPrice || 0;
//         const salePrice = item.price;
//         const profitAmount = salePrice - costPrice;
//         const profitMargin = costPrice > 0 ? ((profitAmount / costPrice) * 100).toFixed(2) : '0.00';

//         return {
//           productId: item.productId,
//           productName: item.name,
//           salePrice,
//           costPrice,
//           profitAmount,
//           profitMargin,
//           quantity: item.quantity
//         };
//       })
//     };

//     // 🧾 عرض البيانات في Console قبل الإرسال
//     console.log('📦 بيانات الطلب المرسلة:', payload);

//     try {
//       await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       alert('✅ تم حفظ الطلب بنجاح');
//       setShowInvoice(true);
//     } catch (err) {
//       console.error('❌ فشل في إرسال الطلب:', err);
//       alert('حدث خطأ أثناء حفظ الطلب');
//     }
//   };

//   // 🖨️ طباعة الفاتورة
//   const handlePrintInvoice = () => {
//     setShowInvoice(true);
//     setTimeout(() => window.print(), 300);
//   };

//   // 🔍 فلترة المنتجات حسب البحث
//   const filteredProducts = products.filter(p =>
//     p.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // 🖼️ واجهة المستخدم
//   return (
//     <div className="create-order-container">
//       <h2>🧾 إنشاء طلب جديد</h2>

//       {/* 📝 نموذج إدخال البيانات */}
//       <form onSubmit={handleSubmit}>
//         <label>👤 اسم المشتري:</label>
//         <input
//           type="text"
//           value={buyerName}
//           onChange={(e) => setBuyerName(e.target.value)}
//           placeholder="مثلاً: محمد بن عيسى"
//         />

//         <label>🔍 ابحث عن المنتج:</label>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="اسم المنتج..."
//         />

//         {/* 🧺 عرض المنتجات */}
//         <div className="product-list">
//           {filteredProducts.map(product => (
//             <div key={product._id} className="product-card">
//               {product.imagePath && (
//                 <img
//                   src={`http://localhost:5000/${product.imagePath.replace(/^\/?/, '')}`}
//                   alt={product.productName}
//                   className="product-image"
//                 />
//               )}
//               <p><strong>{product.productName}</strong></p>
//               <p>💰 السعر: {product.salePrice} دج</p>
//               <p>📦 الكمية: {product.quantity}</p>
//               {product.quantity <= 5 && <p className="warning">⚠️ الكمية منخفضة</p>}
//               <button type="button" onClick={() => handleSelectProduct(product._id)}>➕ إضافة</button>
//             </div>
//           ))}
//         </div>

//         <Link to="/orders">
//           <button type="button" className="go-to-orders-btn">📋 عرض سجل الطلبات</button>
//         </Link>

//         {/* 🛒 المنتجات المختارة */}
//         <div className="selected-items">
//           {selectedItems.map(item => (
//             <div key={item.productId} className="selected-item">
//               {item.image && (
//                 <img src={item.image} alt={item.name} className="selected-image" />
//               )}
//               <p>{item.name}</p>
//               <input
//                 type="number"
//                 min="1"
//                 max={item.available}
//                 value={item.quantity}
//                 onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
//               />
//               <span>💰 {item.price * item.quantity} دج</span>
//             </div>
//           ))}
//         </div>

//         <p className="total">📊 السعر الإجمالي: <strong>{totalPrice} دج</strong></p>

//         <div className="action-buttons">
//           <button type="submit">🚀 تأكيد الطلب</button>
//           <button type="button" onClick={handlePrintInvoice}>🖨️ طباعة الفاتورة</button>
//         </div>
//       </form>

//       {/* 🧾 عرض الفاتورة بعد التأكيد */}
//       {showInvoice && (
//         <div id="invoice-section" className="invoice-preview">
//           <h3>🧾 فاتورة الطلب</h3>
//           <p>👤 المشتري: {buyerName}</p>
//           <p>📅 التاريخ: {new Date().toLocaleDateString()}</p>

//           <table>
//             <thead>
//               <tr>
//                 <th>🖼️ صورة</th>
//                 <th>📦 المنتج</th>
//                 <th>🔢 الكمية</th>
//                 <th>💰 السعر</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedItems.map(item => (
//                 <tr key={item.productId}>
//                   <td>
//                     {item.image && (
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         style={{
//                           width: '60px',
//                           height: '60px',
//                           objectFit: 'contain',
//                           borderRadius: '6px'
//                         }}
//                       />
//                     )}
//                   </td>
//                   <td>{item.name}</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.price * item.quantity} دج</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <p className="total">📊 الإجمالي: <strong>{totalPrice} دج</strong></p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateOrder;



/*---------------------------------------//--------------------------------------------*/

// // // 📦 استيراد المكتبات
// import React, { useState, useEffect } from 'react';
// import './CreateOrder.css';
// import { Link } from 'react-router-dom';

// // 🧾 مكون إنشاء الطلب
// const CreateOrder = () => {
//   // 🧠 الحالات المحلية
//   const [buyerName, setBuyerName] = useState('');
//   const [products, setProducts] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showInvoice, setShowInvoice] = useState(false);

//   // 📥 جلب المنتجات من السيرفر عند تحميل الصفحة
//   useEffect(() => {
//     fetch('http://localhost:5000/api/products')
//       .then(res => res.json())
//       .then(data => setProducts(Array.isArray(data) ? data : []))
//       .catch(err => console.error('❌ فشل في جلب المنتجات:', err));
//   }, []);

//   // 🧮 حساب السعر الإجمالي عند تغيير المنتجات المختارة
//   useEffect(() => {
//     const total = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   }, [selectedItems]);

//   // ➕ إضافة منتج إلى السلة
//   const handleSelectProduct = (productId) => {
//     const product = products.find(p => p._id === productId);
//     if (!product) return;

//     const exists = selectedItems.find(item => item.productId === productId);
//     if (exists) return;

//     const imageUrl = product.imagePath
//       ? `http://localhost:5000/${product.imagePath.replace(/^\/?/, '')}`
//       : null;

//     const newItem = {
//       productId: product._id,
//       name: product.productName,
//       price: product.salePrice,
//       quantity: 1,
//       available: product.quantity,
//       image: imageUrl
//     };

//     setSelectedItems([...selectedItems, newItem]);
//   };

//   // 🔄 تعديل كمية منتج داخل السلة
//   const handleQuantityChange = (productId, value) => {
//     const updated = selectedItems.map(item =>
//       item.productId === productId
//         ? { ...item, quantity: Math.min(value, item.available) }
//         : item
//     );
//     setSelectedItems(updated);
//   };

//   // 🗑️ حذف منتج من السلة
//   const handleRemoveProduct = (productId) => {
//     const updatedItems = selectedItems.filter(item => item.productId !== productId);
//     setSelectedItems(updatedItems);
//   };

//   // 🔄 إعادة تعيين الطلب
//   const handleResetOrder = () => {
//     setBuyerName('');
//     setSelectedItems([]);
//     setTotalPrice(0);
//     setShowInvoice(false);
//   };

//   // 📤 إرسال الطلب إلى السيرفر
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!buyerName || selectedItems.length === 0) {
//       alert('يرجى إدخال اسم المشتري واختيار المنتجات');
//       return;
//     }

//     // 🧮 تجهيز البيانات الكاملة لكل منتج
//     const payload = {
//       buyerName,
//       products: selectedItems.map(item => {
//         const productData = products.find(p => p._id === item.productId);
//         const costPrice = productData?.costPrice || 0;
//         const salePrice = item.price;
//         const image = item.image || productData?.imagePath || '';
//         const profitAmount = salePrice - costPrice;
//         const profitMargin = costPrice > 0 ? ((profitAmount / costPrice) * 100).toFixed(2) : '0.00';

//         return {
//           productId: item.productId,
//           productName: item.name,
//           salePrice,
//           costPrice,
//           profitAmount,
//           profitMargin,
//           image,
//           quantity: item.quantity
//         };
//       })
//     };

//     // 🧾 عرض البيانات في Console قبل الإرسال
//     console.log('📦 الطلب المرسل إلى السيرفر:', payload);

//     try {
//       await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       alert('✅ تم حفظ الطلب بنجاح');
//       setShowInvoice(true);
//     } catch (err) {
//       console.error('❌ فشل في إرسال الطلب:', err);
//       alert('حدث خطأ أثناء حفظ الطلب');
//     }
//   };

//   // 🖨️ طباعة الفاتورة فقط في نافذة جديدة
//   const handlePrintInvoice = () => {
//     const invoiceSection = document.getElementById('invoice-section');
//     if (!invoiceSection) return;

//     const printWindow = window.open('', '', 'width=800,height=600');
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>🧾 فاتورة الطلب</title>
//           <style>
//             body { font-family: Arial; padding: 20px; }
//             table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//             th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
//             img { max-width: 60px; max-height: 60px; object-fit: contain; border-radius: 6px; }
//             h3 { margin-bottom: 10px; }
//           </style>
//         </head>
//         <body>
//           ${invoiceSection.innerHTML}
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//   };

//   // 🔍 فلترة المنتجات حسب البحث
//   const filteredProducts = products.filter(p =>
//     p.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // 🖼️ واجهة المستخدم
//   return (
//     <div className="create-order-container">
//       <h2>🧾 إنشاء طلب جديد</h2>

//       <form onSubmit={handleSubmit}>
//         <label>👤 اسم المشتري:</label>
//         <input
//           type="text"
//           value={buyerName}
//           onChange={(e) => setBuyerName(e.target.value)}
//           placeholder="مثلاً: محمد بن عيسى"
//         />

//         <label>🔍 ابحث عن المنتج:</label>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="اسم المنتج..."
//         />

//         <div className="product-list">
//           {filteredProducts.map(product => (
//             <div key={product._id} className="product-card">
//               {product.imagePath && (
//                 <img
//                   src={`http://localhost:5000/${product.imagePath.replace(/^\/?/, '')}`}
//                   alt={product.productName}
//                   className="product-image"
//                 />
//               )}
//               <p><strong>{product.productName}</strong></p>
//               <p>💰 السعر: {product.salePrice} دج</p>
//               <p>📦 الكمية: {product.quantity}</p>
//               {product.quantity <= 5 && <p className="warning">⚠️ الكمية منخفضة</p>}
//               <button type="button" onClick={() => handleSelectProduct(product._id)}>➕ إضافة</button>
//             </div>
//           ))}
//         </div>

//         <Link to="/orders">
//           <button type="button" className="go-to-orders-btn">📋 عرض سجل الطلبات</button>
//         </Link>

//         <div className="selected-items">
//           {selectedItems.map(item => (
//             <div key={item.productId} className="selected-item">
//               {item.image && (
//                 <img src={item.image} alt={item.name} className="selected-image" />
//               )}
//               <p>{item.name}</p>
//               <input
//                 type="number"
//                 min="1"
//                 max={item.available}
//                 value={item.quantity}
//                 onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
//               />
//               <span>💰 {item.price * item.quantity} دج</span>
//               <button type="button" onClick={() => handleRemoveProduct(item.productId)}>🗑️ حذف</button>
//             </div>
//           ))}
//         </div>

//         <p className="total">📊 السعر الإجمالي: <strong>{totalPrice} دج</strong></p>

//                 <div className="action-buttons">
//           <button type="submit">🚀 تأكيد الطلب</button>
//           <button type="button" onClick={handlePrintInvoice}>🖨️ طباعة الفاتورة</button>
//           <button type="button" onClick={handleResetOrder}>🔄 إعادة تعيين</button>
//         </div>
//       </form>
//       {showInvoice && (
//         <div id="invoice-section" className="invoice-preview">
//           <h3>🧾 فاتورة الطلب</h3>
//           <p>👤 المشتري: {buyerName}</p>
//           <p>📅 التاريخ: {new Date().toLocaleDateString()}</p>

//           <table>
//             <thead>
//               <tr>
//                 <th>🖼️ صورة</th>
//                 <th>📦 المنتج</th>
//                 <th>🔢 الكمية</th>
//                 <th>💰 السعر</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedItems.map(item => (
//                 <tr key={item.productId}>
//                   <td>
//                     {item.image && (
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         style={{
//                           width: '60px',
//                           height: '60px',
//                           objectFit: 'contain',
//                           borderRadius: '6px'
//                         }}
//                       />
//                     )}
//                   </td>
//                   <td>{item.name}</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.price * item.quantity} دج</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <p className="total">📊 الإجمالي: <strong>{totalPrice} دج</strong></p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateOrder;






import React, { useState, useEffect } from 'react';
import './CreateOrder.css';
import { Link } from 'react-router-dom';
import BASE_URL from '../config'; // ✅ هذا يتوافق مع export default

const CreateOrder = () => {
  // 🧠 الحالات المحلية
  const [buyerName, setBuyerName] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);

  // 📥 جلب المنتجات من السيرفر
  useEffect(() => {
    console.log('📡 جاري جلب المنتجات...');
    fetch(`${BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        console.log(`📦 تم جلب ${data.length} منتج`);
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('❌ فشل في جلب المنتجات:', err));
  }, []);

  // 🧮 حساب السعر الإجمالي
  useEffect(() => {
    const total = selectedItems.reduce((acc, item) => {
      const discount = isNaN(item.discount) ? 0 : item.discount;
      const finalPrice = Math.max(item.price - discount, 0);
      return acc + finalPrice * item.quantity;
    }, 0);
    console.log(`📊 السعر الإجمالي: ${total} دج`);
    setTotalPrice(total);
  }, [selectedItems]);

  // ➕ إضافة منتج إلى السلة
  const handleSelectProduct = (productId) => {
    const product = products.find(p => p._id === productId);
    if (!product) return;

    const exists = selectedItems.find(item => item.productId === productId);
    if (exists) return;

    const imageUrl = product.imagePath
      ? `${BASE_URL}/${product.imagePath.replace(/^\/?/, '')}`
      : null;

    const newItem = {
      productId: product._id,
      name: product.productName,
      price: product.salePrice,
      quantity: 1,
      available: product.quantity,
      image: imageUrl,
      discount: 0
    };

    console.log('➕ منتج مضاف للسلة:', newItem);
    setSelectedItems([...selectedItems, newItem]);
  };

  // 🔢 تعديل الكمية
  const handleQuantityChange = (productId, value) => {
    const updated = selectedItems.map(item =>
      item.productId === productId
        ? {
            ...item,
            quantity: isNaN(value) || value < 1 ? 1 : Math.min(value, item.available)
          }
        : item
    );
    console.log(`🔄 تعديل الكمية للمنتج ${productId}: ${value}`);
    setSelectedItems(updated);
  };

  // 💸 تعديل الخصم
  const handleDiscountChange = (productId, rawValue) => {
    const value = parseFloat(rawValue);
    const updated = selectedItems.map(item =>
      item.productId === productId
        ? {
            ...item,
            discount:
              rawValue === '' || isNaN(value) || value < 0
                ? 0
                : Math.min(value, item.price)
          }
        : item
    );
    console.log(`💸 تعديل الخصم للمنتج ${productId}: ${rawValue}`);
    setSelectedItems(updated);
  };

  // 🗑️ حذف منتج من السلة
  const handleRemoveProduct = (productId) => {
    console.log(`🗑️ حذف المنتج من السلة: ${productId}`);
    const updatedItems = selectedItems.filter(item => item.productId !== productId);
    setSelectedItems(updatedItems);
  };

  // 🔄 إعادة تعيين الطلب
  const handleResetOrder = () => {
    console.log('🔄 إعادة تعيين الطلب');
    setBuyerName('');
    setSelectedItems([]);
    setTotalPrice(0);
    setShowInvoice(false);
  };

  // 📤 إرسال الطلب
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyerName || selectedItems.length === 0) {
      alert('يرجى إدخال اسم المشتري واختيار المنتجات');
      return;
    }

    const payload = {
      buyerName,
      products: selectedItems.map(item => {
        const productData = products.find(p => p._id === item.productId);
        const costPrice = productData?.costPrice || 0;
        const salePrice = item.price;
        const discount = isNaN(item.discount) ? 0 : item.discount;
        const finalPrice = Math.max(salePrice - discount, 0);
        const image = item.image || productData?.imagePath || '';
        const profitAmount = finalPrice - costPrice;
        const profitMargin = costPrice > 0 ? ((profitAmount / costPrice) * 100).toFixed(2) : '0.00';

        return {
          productId: item.productId,
          productName: item.name,
          salePrice,
          discount,
          finalPrice,
          costPrice,
          profitAmount,
          profitMargin,
          image,
          quantity: item.quantity
        };
      })
    };

    console.log('🚀 إرسال الطلب:', payload);

    try {
      await fetch(`${BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      alert('✅ تم حفظ الطلب بنجاح');
      setShowInvoice(true);
    } catch (err) {
      console.error('❌ فشل في إرسال الطلب:', err);
      alert('حدث خطأ أثناء حفظ الطلب');
    }
  };

  // 🖨️ طباعة الفاتورة
  const handlePrintInvoice = () => {
    const invoiceSection = document.getElementById('invoice-section');
    if (!invoiceSection) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>🧾 فاتورة الطلب</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            img { max-width: 60px; max-height: 60px; object-fit: contain; border-radius: 6px; }
            h3 { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          ${invoiceSection.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // 🔍 فلترة المنتجات
  const filteredProducts = products.filter(p =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🖼️ واجهة المستخدم
  return (
    <div className="create-order-container">
      <h2>🧾 إنشاء طلب جديد</h2>

      <form onSubmit={handleSubmit}>
        <label>👤 اسم المشتري:</label>
        <input
          type="text"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          placeholder="مثلاً: محمد بن عيسى"
        />

        <label>🔍 ابحث عن المنتج:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="اسم المنتج..."
        />

        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              {product.imagePath && (
                <img
                  src={`${BASE_URL}/${product.imagePath.replace(/^\/?/, '')}`}
                  alt={product.productName}
                  className="product-image"
                />
              )}
              <p><strong>{product.productName}</strong></p>
              <p>💰 السعر: {product.salePrice} دج</p>
              <p>📦 الكمية: {product.quantity}</p>
              {product.quantity <= 5 && <p className="warning">⚠️ الكمية منخفضة</p>}
              <button type="button" onClick={() => handleSelectProduct(product._id)}>➕ إضافة</button>
            </div>
          ))}
        </div>

        <Link to="/orders">
          <button type="button" className="go-to-orders-btn">📋 عرض سجل الطلبات</button>
        </Link>

                <div className="selected-items">
          {selectedItems.map(item => (
            <div key={item.productId} className="selected-item">
              {/* 🖼️ صورة المنتج */}
              {item.image && (
                <img src={item.image} alt={item.name} className="selected-image" />
              )}

              {/* 📦 اسم المنتج */}
              <p>{item.name}</p>

              {/* 🔢 إدخال الكمية (لا تقل عن 1) */}
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.productId, parseInt(e.target.value))
                }
              />

              💸 إدخال الخصم (يُخصم من السعر مباشرة)
              <input
                type="text"
                inputMode="numeric"
                value={item.discount === 0 ? '' : item.discount}
                onChange={(e) =>
                  handleDiscountChange(item.productId, e.target.value)
                }
                placeholder="خصم دج"
              />

              {/* 💰 السعر بعد الخصم × الكمية */}
              <span>
                💰 {Math.max(item.price - item.discount, 0) * item.quantity} دج
              </span>

              {/* 🗑️ زر حذف المنتج من السلة */}
              <button type="button" onClick={() => handleRemoveProduct(item.productId)}>
                🗑️ حذف
              </button>
            </div>
          ))}
        </div>

        {/* 📊 عرض السعر الإجمالي */}
        <p className="total">📊 السعر الإجمالي: <strong>{totalPrice} دج</strong></p>

        {/* 🎯 أزرار التحكم */}
        <div className="action-buttons">
          <button type="submit">🚀 تأكيد الطلب</button>
          <button type="button" onClick={handlePrintInvoice}>🖨️ طباعة الفاتورة</button>
          <button type="button" onClick={handleResetOrder}>🔄 إعادة تعيين</button>
        </div>
      </form>

      {/* 🧾 معاينة الفاتورة بعد التأكيد */}
      {showInvoice && (
        <div id="invoice-section" className="invoice-preview">
          <h3>🧾 فاتورة الطلب</h3>
          <p>👤 المشتري: {buyerName}</p>
          <p>📅 التاريخ: {new Date().toLocaleDateString()}</p>

          <table>
            <thead>
              <tr>
                <th>🖼️ صورة</th>
                <th>📦 المنتج</th>
                <th>🔢 الكمية</th>
                <th>💰 السعر</th>
                <th>💸 الخصم</th>
                <th>💰 السعر بعد الخصم</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map(item => (
                <tr key={item.productId}>
                  <td>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'contain',
                          borderRadius: '6px'
                        }}
                      />
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price} دج</td>
                  <td>{isNaN(item.discount) ? 0 : item.discount} دج</td>
                  <td>{Math.max(item.price - (isNaN(item.discount) ? 0 : item.discount), 0) * item.quantity} دج</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 📊 عرض الإجمالي النهائي */}
          <p className="total">📊 الإجمالي: <strong>{totalPrice} دج</strong></p>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
