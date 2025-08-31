

import React, { useEffect, useState } from 'react';
import './OrdersList.css';
import { Link } from 'react-router-dom';
import BASE_URL from '../config'; // ✅ هذا يتوافق مع export default



const OrdersList = () => {
  // 🧮 الحالة العامة
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📝 إدخال الخصم الجديد
  const [newDiscountAmount, setNewDiscountAmount] = useState('');
  const [newDiscountReason, setNewDiscountReason] = useState('');

  // 🔍 البحث
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [orderSearchTerm, setOrderSearchTerm] = useState('');

  // ✏️ تعديل المنتج
  const [editingProductId, setEditingProductId] = useState(null);
  const [editValues, setEditValues] = useState({
    productName: '',
    costPrice: '',
    salePrice: '',
    quantity: ''
  });

  // 📥 تحميل البيانات عند أول تشغيل
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [productsRes, discountsRes, ordersRes] = await Promise.all([
        fetch(`${BASE_URL}/api/products`),
        fetch(`${BASE_URL}/api/discounts`),
        fetch(`${BASE_URL}/api/orders `)
      ]);

      const productsData = await productsRes.json();
      const discountsData = await discountsRes.json();
      const ordersData = await ordersRes.json();

      setProducts(productsData || []);
      setDiscounts(discountsData || []);
      setOrders(ordersData || []);
      setLoading(false);
      console.log('✅ تم تحميل البيانات بنجاح');
    } catch (err) {
      console.error('❌ فشل في تحميل البيانات:', err);
      setLoading(false);
    }
  };

  // 🔄 تحديث المنتجات من السيرفر
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data || []);
      console.log('🔄 تم تحديث المنتجات');
    } catch (err) {
      console.error('❌ فشل في تحديث المنتجات:', err);
    }
  };

  // 🔄 تحديث الطلبات من السيرفر
  const fetchOrders = async () => {
    try {
      const res = await fetch( `${BASE_URL}/api/orders`);
      const data = await res.json();
      setOrders(data || []);
      console.log('🔄 تم تحديث الطلبات');
    } catch (err) {
      console.error('❌ فشل في تحديث الطلبات:', err);
    }
  };

  // 🔄 تحديث الخصومات من السيرفر
  const fetchDiscounts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/discounts`);
      const data = await res.json();
      setDiscounts(data || []);
      console.log('🔄 تم تحديث الخصومات');
    } catch (err) {
      console.error('❌ فشل في تحديث الخصومات:', err);
    }
  };

  // 📊 الحسابات المالية
  const totalCost = products.reduce((acc, p) => acc + (p.costPrice || 0) * (p.quantity || 0), 0);
  const totalSale = products.reduce((acc, p) => acc + (p.salePrice || 0) * (p.quantity || 0), 0);
  const netProfit = totalSale - totalCost;
  const totalDiscount = discounts.reduce((acc, d) => acc + (d.amount || d.discountAmount || 0), 0);
  const finalProfit = netProfit - totalDiscount;

  const profitMargin = totalCost > 0 ? ((finalProfit / totalCost) * 100).toFixed(2) : '0.00';
  const netProfitPercent = totalCost > 0 ? ((netProfit / totalCost) * 100).toFixed(2) : '0.00';

  const discountPercentOfProfit = netProfit > 0 ? ((totalDiscount / netProfit) * 100).toFixed(2) : '0.00';


   //🧮 الكود المناسب لحساب هامش الربح من الطلبات
   // حسابات مجمعة من الطلبات المعروضة
let totalCostFromOrders = 0;
let totalSaleFromOrders = 0;
let totalDiscountFromOrders = 0;

orders.forEach(order => {
  order.products.forEach(prod => {
    totalCostFromOrders += (prod.costPrice || 0) * (prod.quantity || 0);
    totalSaleFromOrders += (prod.salePrice || 0) * (prod.quantity || 0);
  });

  totalDiscountFromOrders += order.discountAmount || 0;
});


const netProfitFromOrders = totalSaleFromOrders - totalCostFromOrders;
const finalProfitFromOrders = netProfitFromOrders - totalDiscountFromOrders;

const profitMarginFromOrders = totalCostFromOrders > 0
  ? ((finalProfitFromOrders / totalCostFromOrders) * 100).toFixed(2)
  : '0.00';





  
  // 🔍 فلترة المنتجات والطلبات
  const filteredProducts = products.filter(prod =>
    prod.productName?.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const safeSearchTerm = typeof orderSearchTerm === 'string'
    ? orderSearchTerm.trim().toLowerCase()
    : '';

  const filteredOrders = safeSearchTerm === ''
    ? orders
    : orders.filter(order => {
        const buyerName = typeof order.buyerName === 'string' ? order.buyerName.toLowerCase() : '';
        const orderId = order._id ? String(order._id).toLowerCase() : '';
        const createdDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '';
        return buyerName.includes(safeSearchTerm) || orderId.includes(safeSearchTerm) || createdDate.includes(safeSearchTerm);
      });

  // 🧹 حذف طلب
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('⚠️ هل تريد حذف هذا الطلب؟')) return;
    try {
      await fetch(`${BASE_URL}/api/orders/${orderId}`, { method: 'DELETE' });
      await fetchOrders();
    } catch (err) {
      console.error('❌ خطأ أثناء حذف الطلب:', err);
    }
  };

  // 🧹 حذف منتج
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('⚠️ هل تريد حذف هذا المنتج؟')) return;
    try {
      await fetch(`${BASE_URL}/api/products/${productId}`, { method: 'DELETE' });
      await fetchProducts();
    } catch (err) {
      console.error('❌ خطأ أثناء حذف المنتج:', err);
    }
  };

  // ✏️ بدء تعديل منتج
  const handleEditProduct = (productId) => {
    const product = products.find(p => p._id === productId);
    if (product) {
      setEditingProductId(productId);
      setEditValues({ ...product });
      console.log('✏️ بدء تعديل المنتج:', product);
    }
  };

  // 💾 حفظ تعديل المنتج
  const handleSaveEdit = async () => {
    try {
      await fetch(`${BASE_URL}/api/products/${editingProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editValues)
      });
      setEditingProductId(null);
      setEditValues({ productName: '', costPrice: '', salePrice: '', quantity: '' });
      await fetchProducts();
    } catch (err) {
      console.error('❌ فشل في تعديل المنتج:', err);
    }
  };

  // ➕ إضافة خصم جديد
  const handleSubmitDiscount = async (e) => {
    e.preventDefault();
    const amount = parseFloat(newDiscountAmount);
    const reason = newDiscountReason.trim();

    if (!reason || isNaN(amount) || amount <= 0) {
      alert('⚠️ أدخل سببًا ومبلغًا صالحًا للخصم');
      return;
    }

    const isDuplicate = discounts.some(d =>
      d.discountAmount === amount && d.discountReason === reason
    );

    if (isDuplicate) {
      alert('⚠️ هذا الخصم موجود مسبقًا');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/discounts/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discountAmount: amount, discountReason: reason })
      });

      const result = await res.json();
      if (result.success && result.discount) {
        setNewDiscountAmount('');
        setNewDiscountReason('');
        await fetchDiscounts();
        alert('✅ تم حفظ الخصم بنجاح');
      } else {
        alert('❌ فشل في حفظ الخصم');
      }
    } catch (err) {
      console.error('❌ خطأ أثناء إرسال الخصم:', err);
      alert('❌ حدث خطأ أثناء حفظ الخصم');
    }
  };

  // 🧹 حذف خصم
  const handleDeleteDiscount = async (discountId) => {
    if (!window.confirm('⚠️ هل تريد حذف هذا الخصم؟')) return;
    try {
      await fetch(`${BASE_URL}/api/discounts/${discountId}`, { method: 'DELETE' });
      await fetchDiscounts();
    } catch (err) {
      console.error('❌ خطأ أثناء حذف الخصم:', err);
      alert('❌ حدث خطأ أثناء حذف الخصم');
    }
  };

  // 📦 المنتجات منخفضة التخزين
  const lowStockProducts = products.filter(p => p.quantity <= 5);
  console.log('📦 المنتجات منخفضة التخزين:', lowStockProducts);

  // 🧪 فحص الطلبات بعد كل تحميل أو تعديل
  useEffect(() => {
    orders.forEach(order => {
      console.log('🔍 فحص الطلب:', {
        buyerName: order.buyerName,
        _id: order._id,
        createdAt: order.createdAt
      });
    });
  }, [orders]);


  // 🖼️ واجهة المستخدم (اختياري: يمكن فصلها في ملف JSX مستقل)


  if (loading) return <p className="orders-container">⏳ جاري تحميل البيانات...</p>;

  return (
    <div className="orders-container">
      <h2>📋 لوحة التحكم المالية</h2>




{/* ✅ ملخص مالي شامل */}
<div className="summary-box">
  <div className="summary-item"><strong>عدد المنتجات</strong> {products.length}</div>
  <div className="summary-item"><strong>رأس المال</strong> {totalCost.toFixed(2)} دج</div>
  <div className="summary-item"><strong>سعر البيع</strong> {totalSale.toFixed(2)} دج</div>
  <div className="summary-item"><strong>الربح الصافي</strong> {netProfit.toFixed(2)} دج</div>
  <div className="summary-item"><strong>الخصومات</strong> {totalDiscount.toFixed(2)} دج</div>
  <div className="summary-item"><strong>الربح بعد الخصم</strong> {finalProfit.toFixed(2)} دج</div>
  <div className="summary-item"> <strong>هامش الربح</strong> {profitMarginFromOrders}% </div>
  <div className="summary-item"><strong>هامش الربح</strong> {finalProfitFromOrders.toFixed(2)} دج</div>
  <div className="summary-item"><strong>نسبة الربح الصافي من رأس المال</strong> {netProfitPercent}%</div>
  <div className="summary-item"><strong>نسبة الخصم من الربح الصافي</strong> {discountPercentOfProfit}%</div>
</div>
 
 {/* ✨ مثال عملي: شريط تنقل بسيط */}

<div className="navbar">
  <Link to="/">🏠 الرئيسية</Link>
  <Link to="/orders">📦 الطلبات</Link>
  <Link to="/add">➕ إضافة منتج</Link>
  <Link to="/order">📝 إنشاء طلب</Link>
  <Link to="/login">🔐 تسجيل الدخول</Link>
</div>




      {/* ✅ نموذج إضافة خصم */}
      <form onSubmit={handleSubmitDiscount} className="discount-box">
        <h3>➕ إضافة خصم جديد</h3>
        <input type="number" placeholder="💸 قيمة الخصم" value={newDiscountAmount} onChange={(e) => setNewDiscountAmount(e.target.value)} />
        <input type="text" placeholder="📌 سبب الخصم" value={newDiscountReason} onChange={(e) => setNewDiscountReason(e.target.value)} />
        <button type="submit">💾 حفظ الخصم</button>
      </form>


{/* ✅ عرض الخصومات */}
<div className="discounts-list">
  <h3>💸 الخصومات المسجلة</h3>
  <ul>
    {discounts.map((d, index) => {
      console.log(`📦 خصم رقم ${index + 1}:`, d);

      const amountText = typeof d.discountAmount === 'number' && !isNaN(d.discountAmount)
        ? `${d.discountAmount} دج`
        : '❌ بدون مبلغ';

      const reasonText = typeof d.discountReason === 'string' && d.discountReason.trim() !== ''
        ? d.discountReason
        : '❌ بدون سبب';

      const appliedDate = new Date(d.appliedAt);
      const dateText = appliedDate.toLocaleDateString();
      const timeText = appliedDate.toLocaleTimeString();

      return (
        <li key={d._id} className="discount-item">
          <div className="discount-info">
            <p>✅ <strong>المبلغ:</strong> {amountText}</p>
            <p>📌 <strong>السبب:</strong> {reasonText}</p>
            <p>📅 <strong>تاريخ التطبيق:</strong> {dateText} — ⏰ {timeText}</p>
            <p>📊 <strong>نسبة الخصم:</strong> {d.discountRate || 0}%</p>
          </div>
          <button onClick={() => handleDeleteDiscount(d._id)} className="delete-btn">🗑️ حذف</button>
        </li>
      );
    })}
  </ul>
</div>

     
   {/* 🔍 البحث عن منتج */}
<div className="search-bar">
  <input
    type="text"
    placeholder="🔍 ابحث عن منتج..."
    value={productSearchTerm}
    onChange={(e) => setProductSearchTerm(e.target.value)}
    className="search-input"
  />
</div>



{/* ✅ المنتجات المتوفرة */}
<h3>📦 المنتجات المتوفرة</h3>
<div className="products-table-container">
  <table className="products-table">
    <thead>
      <tr>
        <th>🖼️ صورة</th>
        <th>📛 الاسم</th>
        <th>💸 التكلفة</th>
        <th>💰 البيع</th>
        <th>📈 هامش الربح</th>
        <th>🔢 الكمية</th>
        <th>💵 القيمة الإجمالية</th>
      </tr>
    </thead>
    <tbody>
      {filteredProducts.map((prod, index) => {
        const margin = prod.salePrice - prod.costPrice;
        const marginPercent = prod.costPrice > 0
          ? ((margin / prod.costPrice) * 100).toFixed(2)
          : '0.00';
        const totalProdPrice = prod.salePrice * prod.quantity;
        const imageUrl = `${BASE_URL}${prod.imagePath || prod.image}`;

        return (
          <tr key={prod._id || index}>
            <td><img src={imageUrl} alt={prod.productName} className="table-product-image" /></td>
            <td>{prod.productName}</td>
            <td>{prod.costPrice} دج</td>
            <td>{prod.salePrice} دج</td>
            <td style={{ color: margin > 0 ? 'green' : 'red' }}>
              {margin.toFixed(2)} دج ({marginPercent}%)
            </td>
            <td>{prod.quantity}</td>
            <td>{totalProdPrice.toFixed(2)} دج</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>






      {/* ✅ المنتجات منخفضة التخزين */}
{lowStockProducts.length > 0 && (
  <div className="low-stock-warning">
    <h3>⚠️ منتجات منخفضة التخزين</h3>
    <div className="low-stock-table-container">
      <table className="low-stock-table">
        <thead>
          <tr>
            <th>🖼️ صورة</th>
            <th>📛 الاسم</th>
            <th>📦 الكمية</th>
            <th>💸 التكلفة</th>
            <th>💰 البيع</th>
            <th>📈 هامش الربح</th>
            <th>🛠️ تعديل</th>
          </tr>
        </thead>
        <tbody>
          {lowStockProducts.map(p => {
            const imageUrl = `${BASE_URL}${p.imagePath}`;
            const marginValue = p.salePrice - p.costPrice;
            const marginPercent = p.costPrice > 0
              ? ((marginValue / p.costPrice) * 100).toFixed(2)
              : '0.00';

            return (
              <tr key={p._id}>
                <td><img src={imageUrl} alt={p.productName} className="table-product-image" /></td>
                <td>{p.productName}</td>
                <td style={{ color: p.quantity <= 5 ? 'red' : 'orange' }}>{p.quantity}</td>
                <td>{p.costPrice} دج</td>
                <td>{p.salePrice} دج</td>
                <td style={{ color: marginValue > 0 ? 'green' : 'red' }}>
                  {marginValue.toFixed(2)} دج ({marginPercent}%)
                </td>
                <td>
                  <button onClick={() => handleEditProduct(p._id)}>✏️ تعديل</button>
                  <button onClick={() => handleDeleteProduct(p._id)}>🗑️ حذف</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ✅ نموذج التعديل */}
      {editingProductId && (
        <div className="edit-form">
          <h4>🛠️ تعديل المنتج</h4>
          <input
            type="text"
            value={editValues.productName}
            onChange={(e) => setEditValues({ ...editValues, productName: e.target.value })}
            placeholder="📛 الاسم"
          />
          <input
            type="number"
            value={editValues.costPrice}
            onChange={(e) => setEditValues({ ...editValues, costPrice: parseFloat(e.target.value) })}
            placeholder="💸 التكلفة"
          />
          <input
            type="number"
            value={editValues.salePrice}
            onChange={(e) => setEditValues({ ...editValues, salePrice: parseFloat(e.target.value) })}
            placeholder="💰 البيع"
          />
          <input
            type="number"
            value={editValues.quantity}
            onChange={(e) => setEditValues({ ...editValues, quantity: parseInt(e.target.value) })}
            placeholder="📦 الكمية"
          />
          <button onClick={handleSaveEdit}>💾 حفظ التعديل</button>
          <button onClick={() => setEditingProductId(null)}>❌ إلغاء</button>
        </div>
      )}
    </div>
  </div>
)}


  {/* 🔍 البحث عن طلب */}
<div className="search-bar">
  <input
    type="text"
    placeholder="🔍 ابحث باسم المشتري..."
    value={orderSearchTerm}
    onChange={(e) => setOrderSearchTerm(e.target.value)}
    className="search-input"
  />
</div>


{/* ✅ الطلبات */}
<h3>🧾 الطلبات المسجلة</h3>
<div className="orders-list">
  {filteredOrders.map(order => {
    const totalPrice = order.products.reduce((acc, prod) => acc + (prod.salePrice * prod.quantity), 0);
    const discountAmount = order.discountAmount || 0;
    const finalPrice = totalPrice - discountAmount;
    const createdAt = new Date(order.createdAt);

    return (
      <div key={order._id} className="order-card">
        <h4>🆔 رقم الطلب: {order._id}</h4>
        <p><strong>👤 المشتري:</strong> {order.buyerName || '❌ لم يتم تحديد الاسم'}</p>
        <p><strong>📅 التاريخ:</strong> {createdAt.toLocaleDateString()}</p>
        <p><strong>⏰ الساعة:</strong> {createdAt.toLocaleTimeString()}</p>
        <p><strong>📦 عدد المنتجات:</strong> {order.products.length}</p>

        {/* ✅ جدول المنتجات داخل الطلب */}
        <div className="order-products-table-container">
          <table className="order-products-table">
            <thead>
              <tr>
                <th>🖼️ صورة</th>
                <th>📛 الاسم</th>
                <th>💸 التكلفة</th>
                <th>💰 البيع</th>
                <th>📈 هامش الربح</th>
                <th>🔢 الكمية</th>
                <th>💵 السعر الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((prod, index) => {
                const margin = prod.salePrice - prod.costPrice;
                const marginPercent = prod.costPrice > 0
                  ? ((margin / prod.costPrice) * 100).toFixed(2)
                  : '0.00';
                const totalProdPrice = prod.salePrice * prod.quantity;
                const imageUrl = `${BASE_URL}${prod.imagePath || prod.image}`;

                return (
                  <tr key={index}>
                    <td><img src={imageUrl} alt={prod.productName} className="table-product-image" /></td>
                    <td>{prod.productName}</td>
                    <td>{prod.costPrice} دج</td>
                    <td>{prod.salePrice} دج</td>
                    <td style={{ color: margin > 0 ? 'green' : 'red' }}>
                      {margin.toFixed(2)} دج ({marginPercent}%)
                    </td>
                    <td>{prod.quantity}</td>
                    <td>{totalProdPrice.toFixed(2)} دج</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ✅ ملخص الطلب */}
        <div className="order-summary">
          <p><strong>💵 إجمالي السعر:</strong> {totalPrice.toFixed(2)} دج</p>
          <p><strong>💸 الخصم:</strong> {discountAmount.toFixed(2)} دج</p>
          <p><strong>✅ السعر النهائي بعد الخصم:</strong> {finalPrice.toFixed(2)} دج</p>
        </div>

        <button onClick={() => handleDeleteOrder(order._id)}>🗑️ حذف الطلب</button>
      </div>
    );
  })}
</div>


      
    </div>
  );
};

export default OrdersList;


