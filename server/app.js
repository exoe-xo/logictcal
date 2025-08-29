//📁 server/app.js
// const express = require('express');
// const cors = require('cors');

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Routes
// const productRoutes = require('./routes/products');
// app.use('/api/products', productRoutes);
// const orderRoutes = require('./routes/orders');
// app.use('/api/orders', orderRoutes);


// module.exports = app;





// // 📦 المتطلبات الأساسية
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// const app = express();

// // 🧩 Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // 🔍 طباعة مسار مجلد الصور عند تشغيل السيرفر
// const uploadsPath = path.join(__dirname,'uploads');
// console.log('📁 مسار مجلد الصور:', uploadsPath);

// // 📸 طباعة الصور الموجودة داخل مجلد uploads
// fs.readdir(uploadsPath, (err, files) => {
//   if (err) {
//     console.log('❌ خطأ في قراءة مجلد الصور:', err);
//   } else {
//     console.log('📷 الصور الموجودة حالياً:', files);
//   }
// });

// // 🔎 تحقق من وجود الصورة قبل تقديمها
// app.get('/uploads/:imageName', (req, res, next) => {
//   const imagePath = path.join(uploadsPath, req.params.imageName);
//   console.log('🔍 التحقق من وجود الصورة:', imagePath);

//   if (!fs.existsSync(imagePath)) {
//     console.log('❌ الصورة غير موجودة في المجلد');
//     return res.status(404).json({ error: 'الصورة غير موجودة' });
//   }

//   next(); // إذا كانت موجودة، دع Express يعرضها
// });

// // 🖼️ تقديم الصور من مجلد uploads
// app.use('/uploads', express.static(uploadsPath));

// // 🧪 سجل بسيط لكل طلب
// app.use((req, res, next) => {
//   console.log(`📥 طلب وارد: [${req.method}] ${req.url}`);
//   next();
// });

// // 📦 Routes
// const productRoutes = require('./routes/products');
// app.use('/api/products', productRoutes);

// const orderRoutes = require('./routes/orders'); // إذا كنت أضفتها
// app.use('/api/orders', orderRoutes);

// // 🧪 مسار اختبار
// app.get('/', (req, res) => {
//   console.log('✅ تم الوصول إلى المسار الرئيسي /');
//   res.send('🚀 السيرفر يعمل بنجاح');
// });

// // 🛑 معالجة المسارات غير الموجودة
// app.use((req, res) => {
//   console.log('⚠️ مسار غير معروف:', req.method, req.url);
//   res.status(404).json({ error: 'المسار غير موجود' });
// });

// module.exports = app;





// // 📦 المتطلبات الأساسية
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// const app = express();

// // 🧩 تفعيل الـ Middlewares الأساسية
// app.use(cors()); // ✅ السماح بالوصول من الواجهة الأمامية
// app.use(express.json()); // ✅ تحليل JSON في الطلبات
// app.use(express.urlencoded({ extended: true })); // ✅ دعم البيانات المرسلة من النماذج

// // 📁 تحديد مسار مجلد الصور
// const uploadsPath = path.join(__dirname, 'uploads');
// console.log('📁 مسار مجلد الصور:', uploadsPath);

// // 📸 طباعة أسماء الصور الموجودة داخل مجلد uploads عند تشغيل السيرفر
// fs.readdir(uploadsPath, (err, files) => {
//   if (err) {
//     console.log('❌ خطأ في قراءة مجلد الصور:', err.message);
//   } else {
//     console.log(`📷 عدد الصور داخل المجلد: ${files.length}`);
//     console.log('📷 الصور الموجودة حالياً:', files);
//   }
// });

// // 🔎 تحقق من وجود الصورة قبل تقديمها
// app.get('/uploads/:imageName', (req, res, next) => {
//   const imagePath = path.join(uploadsPath, req.params.imageName);
//   console.log(`🔍 التحقق من وجود الصورة المطلوبة: ${imagePath}`);

//   if (!fs.existsSync(imagePath)) {
//     console.log('❌ الصورة غير موجودة في المجلد');
//     return res.status(404).json({ error: 'الصورة غير موجودة' });
//   }

//   next(); // ✅ إذا كانت موجودة، دع Express يعرضها
// });

// // 🖼️ تقديم الصور من مجلد uploads بشكل عام
// app.use('/uploads', express.static(uploadsPath));
// console.log('🖼️ تم تفعيل تقديم الصور من /uploads');

// // 🧪 سجل بسيط لكل طلب وارد للسيرفر
// app.use((req, res, next) => {
//   console.log(`📥 طلب وارد: [${req.method}] ${req.url}`);
//   next();
// });

// // 📦 ربط المسارات الخاصة بالمنتجات
// try {
//   const productRoutes = require('./routes/products');
//   app.use('/api/products', productRoutes);
//   console.log('✅ تم ربط مسار /api/products');
// } catch (err) {
//   console.error('❌ خطأ في ربط مسار المنتجات:', err.message);
// }





// const ordersRoutes = require('./routes/orders');
// app.use('/api/orders', ordersRoutes);

// const productsRoutes = require('./routes/products');
// app.use('/api/products', productsRoutes);


// // 📦 ربط المسارات الخاصة بالطلبات
// try {
//   const orderRoutes = require('./routes/orders');
//   app.use('/api/orders', orderRoutes);
//   console.log('✅ تم ربط مسار /api/orders');
// } catch (err) {
//   console.error('❌ خطأ في ربط مسار الطلبات:', err.message);
// }

// // 🧪 مسار اختبار للتأكد من أن السيرفر يعمل
// app.get('/', (req, res) => {
//   console.log('✅ تم الوصول إلى المسار الرئيسي /');
//   res.send('🚀 السيرفر يعمل بنجاح');
// });

// // 🛑 معالجة أي مسار غير معروف
// app.use((req, res) => {
//   console.log(`⚠️ مسار غير معروف: [${req.method}] ${req.url}`);
//   res.status(404).json({ error: 'المسار غير موجود' });
// });

// module.exports = app;

// // 📦 المتطلبات الأساسية
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// const app = express();

// // 🧩 تفعيل الـ Middlewares الأساسية
// app.use(cors()); // ✅ السماح بالوصول من الواجهة الأمامية
// app.use(express.json()); // ✅ تحليل JSON في الطلبات
// app.use(express.urlencoded({ extended: true })); // ✅ دعم البيانات المرسلة من النماذج

// // 📁 تحديد مسار مجلد الصور
// const uploadsPath = path.join(__dirname, 'uploads');
// console.log('📁 مسار مجلد الصور:', uploadsPath);

// // 📸 طباعة أسماء الصور الموجودة داخل مجلد uploads عند تشغيل السيرفر
// fs.readdir(uploadsPath, (err, files) => {
//   if (err) {
//     console.log('❌ خطأ في قراءة مجلد الصور:', err.message);
//   } else {
//     console.log(`📷 عدد الصور داخل المجلد: ${files.length}`);
//     console.log('📷 الصور الموجودة حالياً:', files);
//   }
// });



// app.use('/api/discounts', require('./routes/discounts'));


// // 🔎 تحقق من وجود الصورة قبل تقديمها
// app.get('/uploads/:imageName', (req, res, next) => {
//   const imagePath = path.join(uploadsPath, req.params.imageName);
//   console.log(`🔍 التحقق من وجود الصورة المطلوبة: ${imagePath}`);

//   if (!fs.existsSync(imagePath)) {
//     console.log('❌ الصورة غير موجودة في المجلد');
//     return res.status(404).json({ error: 'الصورة غير موجودة' });
//   }

//   next(); // ✅ إذا كانت موجودة، دع Express يعرضها
// });

// // 🖼️ تقديم الصور من مجلد uploads بشكل عام
// app.use('/uploads', express.static(uploadsPath));
// console.log('🖼️ تم تفعيل تقديم الصور من /uploads');

// // 🧪 سجل بسيط لكل طلب وارد للسيرفر
// app.use((req, res, next) => {
//   console.log(`📥 طلب وارد: [${req.method}] ${req.url}`);
//   next();
// });

// // 📦 ربط المسارات الخاصة بالمنتجات
// try {
//   const productsRoutes = require('./routes/products');
//   app.use('/api/products', productsRoutes);
//   console.log('✅ تم ربط مسار /api/products');
// } catch (err) {
//   console.error('❌ خطأ في ربط مسار المنتجات:', err.message);
// }

// // 📦 ربط المسارات الخاصة بالطلبات
// try {
//   const ordersRoutes = require('./routes/orders');
//   app.use('/api/orders', ordersRoutes);
//   console.log('✅ تم ربط مسار /api/orders');
// } catch (err) {
//   console.error('❌ خطأ في ربط مسار الطلبات:', err.message);
// }

// // 🧪 مسار اختبار للتأكد من أن السيرفر يعمل
// app.get('/', (req, res) => {
//   console.log('✅ تم الوصول إلى المسار الرئيسي /');
//   res.send('🚀 السيرفر يعمل بنجاح');
// });

// // 🛑 معالجة أي مسار غير معروف
// app.use((req, res) => {
//   console.log(`⚠️ مسار غير معروف: [${req.method}] ${req.url}`);
//   res.status(404).json({ error: 'المسار غير موجود' });
// });

// // 📤 تصدير التطبيق
// module.exports = app;


// 📦 المتطلبات الأساسية
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// 🧩 تفعيل الـ Middlewares الأساسية
app.use(cors()); // ✅ السماح بالوصول من الواجهة الأمامية
app.use(express.json()); // ✅ تحليل JSON في الطلبات
app.use(express.urlencoded({ extended: true })); // ✅ دعم البيانات المرسلة من النماذج

// 📥 سجل بسيط لكل طلب وارد للسيرفر
app.use((req, res, next) => {
  console.log(`📥 طلب وارد: [${req.method}] ${req.url}`);
  next();
});

// 📁 تحديد مسار مجلد الصور
const uploadsPath = path.join(__dirname, 'uploads');
console.log('📁 مسار مجلد الصور:', uploadsPath);

// 📸 طباعة أسماء الصور الموجودة داخل مجلد uploads عند تشغيل السيرفر
fs.readdir(uploadsPath, (err, files) => {
  if (err) {
    console.log('❌ خطأ في قراءة مجلد الصور:', err.message);
  } else {
    console.log(`📷 عدد الصور داخل المجلد: ${files.length}`);
    console.log('📷 الصور الموجودة حالياً:', files);
  }
});

// 🔎 التحقق من وجود الصورة قبل تقديمها
app.get('/uploads/:imageName', (req, res, next) => {
  const imagePath = path.join(uploadsPath, req.params.imageName);
  console.log(`🔍 التحقق من وجود الصورة المطلوبة: ${imagePath}`);

  if (!fs.existsSync(imagePath)) {
    console.log('❌ الصورة غير موجودة في المجلد');
    return res.status(404).json({ error: 'الصورة غير موجودة' });
  }

  next(); // ✅ إذا كانت موجودة، دع Express يعرضها
});

// 🖼️ تقديم الصور من مجلد uploads بشكل عام
app.use('/uploads', express.static(uploadsPath));
console.log('🖼️ تم تفعيل تقديم الصور من /uploads');

// 📦 ربط المسارات الخاصة بالخصومات
try {
  const discountsRoutes = require('./routes/discounts');
  app.use('/api/discounts', discountsRoutes);
  console.log('✅ تم ربط مسار /api/discounts');
} catch (err) {
  console.error('❌ خطأ في ربط مسار الخصومات:', err.message);
}

// 📦 ربط المسارات الخاصة بالمنتجات
try {
  const productsRoutes = require('./routes/products');
  app.use('/api/products', productsRoutes);
  console.log('✅ تم ربط مسار /api/products');
} catch (err) {
  console.error('❌ خطأ في ربط مسار المنتجات:', err.message);
}

// 📦 ربط المسارات الخاصة بالطلبات
try {
  const ordersRoutes = require('./routes/orders');
  app.use('/api/orders', ordersRoutes);
  console.log('✅ تم ربط مسار /api/orders');
} catch (err) {
  console.error('❌ خطأ في ربط مسار الطلبات:', err.message);
}

// 🧪 مسار اختبار للتأكد من أن السيرفر يعمل
app.get('/', (req, res) => {
  console.log('✅ تم الوصول إلى المسار الرئيسي /');
  res.send('🚀 السيرفر يعمل بنجاح');
});

// 🛑 معالجة أي مسار غير معروف
app.use((req, res) => {
  console.log(`⚠️ مسار غير معروف: [${req.method}] ${req.url}`);
  res.status(404).json({ error: 'المسار غير موجود' });
});

// 📤 تصدير التطبيق
module.exports = app;
