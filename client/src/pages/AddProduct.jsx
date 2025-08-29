// ✅ صفحة إدخال منتج جديد
// 📁 client/src/pages/AddProduct.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 🔀 للتنقل بين الصفحات
import './AddProduct.css'; // 🎨 تنسيقات الواجهة
import BASE_URL from '../config'; // عدّل المسار حسب مكان الملف


const AddProduct = () => {
  const navigate = useNavigate();

  // 🧠 الحالة المحلية للنموذج
  const [productName, setProductName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [costPrice, setCostPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 📦 استرجاع البيانات من localStorage عند تحميل الصفحة
  useEffect(() => {
    const saved = localStorage.getItem('productForm');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProductName(parsed.productName || '');
      setCostPrice(parsed.costPrice || '');
      setSalePrice(parsed.salePrice || '');
      setQuantity(parsed.quantity || '');
      setImagePreview(parsed.imagePreview || null);
      console.log('📦 تم استرجاع بيانات النموذج من localStorage');
    }
  }, []);

  // 💾 حفظ البيانات تلقائيًا في localStorage عند التغيير
  useEffect(() => {
    const formData = {
      productName,
      costPrice,
      salePrice,
      quantity,
      imagePreview
    };
    localStorage.setItem('productForm', JSON.stringify(formData));
    console.log('💾 تم حفظ النموذج في localStorage');
  }, [productName, costPrice, salePrice, quantity, imagePreview]);

  // 📊 حساب هامش الربح بالنسبة المئوية
  const calculateProfitMargin = (cost, sale) => {
    const c = parseFloat(cost);
    const s = parseFloat(sale);
    if (isNaN(c) || isNaN(s) || c <= 0) return 0;
    const margin = ((s - c) / c) * 100;
    console.log('📊 هامش الربح:', margin.toFixed(2));
    return margin.toFixed(2);
  };

  // 💵 حساب قيمة الربح
  const calculateProfitAmount = (cost, sale) => {
    const c = parseFloat(cost);
    const s = parseFloat(sale);
    if (isNaN(c) || isNaN(s) || c <= 0) return 0;
    const amount = s - c;
    console.log('💵 قيمة الربح:', amount.toFixed(2));
    return amount.toFixed(2);
  };
 
  const profitMargin = calculateProfitMargin(costPrice, salePrice);
  const profitAmount = calculateProfitAmount(costPrice, salePrice);

  // 📷 رفع الصورة ومعاينتها
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log('📁 تم اختيار الصورة:', file);
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        console.log('🖼️ معاينة الصورة جاهزة');
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ تأكيد البيانات قبل الإرسال
  const handleConfirm = () => {
    console.log('✅ تم تأكيد البيانات');
    setIsConfirmed(true);
  };

  // 🧹 إعادة تعيين النموذج
  const handleReset = () => {
    localStorage.removeItem('productForm');
    setProductName('');
    setCostPrice('');
    setSalePrice('');
    setQuantity('');
    setImageFile(null);
    setImagePreview(null);
    setIsConfirmed(false);
    console.log('🧹 تم إعادة تعيين النموذج');
  };

  // 🚀 إرسال النموذج إلى الخادم
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !costPrice || !salePrice || !quantity || !imageFile || !isConfirmed) {
      console.warn('⚠️ النموذج غير مكتمل أو غير مؤكد');
      alert('يرجى إدخال جميع البيانات وتأكيدها قبل الإرسال');
      return;
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('costPrice', costPrice);
    formData.append('salePrice', salePrice);
    formData.append('quantity', quantity);
    formData.append('profitMargin', profitMargin);
    formData.append('profitAmount', profitAmount);
    formData.append('image', imageFile);

    console.log('📦 إرسال النموذج إلى الخادم مع الصورة');

    try {
      const res = await fetch(`${BASE_URL}/api/products/add`, {
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      console.log('📬 استجابة الخادم:', result);
      alert('✅ تم حفظ المنتج والصورة في قاعدة البيانات');

      handleReset(); // 🧹 إعادة تعيين النموذج بعد الإرسال
    } catch (err) {
      console.error('❌ فشل في إرسال النموذج:', err);
      alert('حدث خطأ أثناء الإرسال');
    }
  };

  return (
    <div className="add-product-container">
      <h2>📦 إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit}>
        <label>🏷️ اسم المنتج:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />

        <label>📷 صورة المنتج:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && <img src={imagePreview} alt="معاينة" width="150" />}

        <label>💰 السعر الأصلي:</label>
        <input type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} />

        <label>🛒 سعر البيع:</label>
        <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />

        <label>📦 الكمية:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

        <p style={{ color: profitMargin > 0 ? 'green' : 'red' }}>
          📊 هامش الربح: {profitMargin}% ({profitAmount} دج)
        </p>

        <button type="button" onClick={handleConfirm}>✅ تأكيد البيانات</button>
        <button type="submit" disabled={!isConfirmed}>🚀 إرسال المنتج</button>
        <button type="button" onClick={handleReset}>🧹 إعادة تعيين</button>
        <button type="button" onClick={() => navigate('/order')}>🧾 الذهاب لإنشاء طلب</button>
      </form>
    </div>
  );
};

export default AddProduct;
