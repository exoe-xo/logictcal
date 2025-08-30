// //📁 server/routes/products.js
// const express = require('express');
// const router = express.Router(); // ✅ هذا هو التعريف الناقص
// const multer = require('multer');
// const Product = require('../models/Product');

// const upload = multer({ dest: 'uploads/' }); // أو استخدم diskStorage لاحقًا

// // 📥 استقبال بيانات المنتج مع الصورة
// router.post('/add', upload.single('image'), async (req, res) => {
//   try {
//     const { productName, costPrice, salePrice, quantity, profitMargin, profitAmount } = req.body;
//     const imagePath = req.file ? req.file.path : null;

//     const newProduct = new Product({
//       productName,
//       costPrice,
//       salePrice,
//       quantity,
//       profitMargin,
//       profitAmount,
//       imagePath,
//       createdAt: new Date()
//     });

//     await newProduct.save();
//     console.log('✅ تم حفظ المنتج مع الصورة في قاعدة البيانات');
//     res.status(201).json({ message: 'تم حفظ المنتج بنجاح' });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حفظ المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في حفظ المنتج' });
//   }
// });

// module.exports = router;

/*----------------------------------------------------------------------------------------------------*/


//📁 server/routes/products.js
// const express = require('express');
// const router = express.Router(); // ✅ تعريف الراوتر
// const multer = require('multer');
// const Product = require('../models/Product');

// // 📦 إعداد التخزين للصور
// const upload = multer({ dest: 'uploads/' }); // يمكن تحسينه لاحقًا بـ diskStorage

// // 📥 استقبال بيانات المنتج مع الصورة
// router.post('/add', upload.single('image'), async (req, res) => {
//   try {
//     const { productName, costPrice, salePrice, quantity, profitMargin, profitAmount } = req.body;
//     const imagePath = req.file ? req.file.path : null;

//     const newProduct = new Product({
//       productName,
//       costPrice,
//       salePrice,
//       quantity,
//       profitMargin,
//       profitAmount,
//       imagePath,
//       createdAt: new Date()
//     });

//     await newProduct.save();
//     console.log('✅ تم حفظ المنتج مع الصورة في قاعدة البيانات');
//     res.status(201).json({ message: 'تم حفظ المنتج بنجاح' });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حفظ المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في حفظ المنتج' });
//   }
// });

// // ✅ جلب كل المنتجات لصفحة إنشاء الطلب
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 }); // ترتيب حسب الأحدث
//     console.log('📦 تم جلب المنتجات:', products.length);
//     res.json(products);
//   } catch (error) {
//     console.error('❌ خطأ أثناء جلب المنتجات:', error.message);
//     res.status(500).json({ error: 'فشل في جلب المنتجات' });
//   }
// });

// module.exports = router;

/*---------------------------------------------------------------------------------------------------*/

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const Product = require('../models/Product');

// // إعداد التخزين للصور
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => {
//     const ext = file.originalname.split('.').pop();
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
//     cb(null, uniqueName);
//   }
// });

// const upload = multer({ storage });

// // 📥 إضافة منتج جديد مع صورة
// router.post('/add', upload.single('image'), async (req, res) => {
//   try {
//     const { productName, costPrice, salePrice, quantity, profitMargin, profitAmount } = req.body;
//     const imagePath = req.file ? `uploads/${req.file.filename}` : null;

//     const newProduct = new Product({
//       productName,
//       costPrice,
//       salePrice,
//       quantity,
//       profitMargin,
//       profitAmount,
//       imagePath
//     });

//     await newProduct.save();
//     res.status(201).json({ message: '✅ تم حفظ المنتج بنجاح' });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حفظ المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في حفظ المنتج' });
//   }
// });

// // 📤 جلب كل المنتجات
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     console.error('❌ خطأ أثناء جلب المنتجات:', error.message);
//     res.status(500).json({ error: 'فشل في جلب المنتجات' });
//   }
// });

// module.exports = router;



// // استيراد الحزم المطلوبة
// // 📦 استيراد الحزم والنماذج
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const Product = require('../models/Product');

// // 🗂️ إعداد مجلد التخزين للصور
// const uploadDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
//   console.log('📁 تم إنشاء مجلد uploads تلقائيًا');
// }

// // ⚙️ إعداد التخزين باستخدام multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, uniqueName);
//   }
// });

// const upload = multer({ storage });


// // 📥 إضافة منتج جديد مع صورة
// router.post('/add', upload.single('image'), async (req, res) => {
//   console.log('\n📨 [POST] /api/products/add - إضافة منتج جديد');

//   try {
//     const { productName, costPrice, salePrice, quantity, profitMargin, profitAmount } = req.body;

//     // ✅ تحقق من اكتمال البيانات
//     if (!productName || !costPrice || !salePrice || !quantity) {
//       console.warn('⚠️ بيانات المنتج غير مكتملة:', req.body);
//       return res.status(400).json({ error: 'البيانات غير مكتملة' });
//     }

//     // 🖼️ إعداد مسار الصورة
//     const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//     if (req.file && !fs.existsSync(req.file.path)) {
//       console.error('❌ لم يتم حفظ الصورة بشكل صحيح');
//       return res.status(400).json({ error: 'فشل في حفظ الصورة' });
//     }

//     // 🆕 إنشاء المنتج
//     const newProduct = new Product({
//       productName,
//       costPrice,
//       salePrice,
//       quantity,
//       profitMargin,
//       profitAmount,
//       imagePath
//     });

//     await newProduct.save();
//     console.log('✅ تم حفظ المنتج بنجاح:', newProduct._id);
//     res.status(201).json({ message: 'تم حفظ المنتج بنجاح', product: newProduct });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حفظ المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في حفظ المنتج' });
//   }
// });


// // 📤 جلب كل المنتجات
// router.get('/', async (req, res) => {
//   console.log('\n📨 [GET] /api/products - جلب كل المنتجات');

//   try {
//     const products = await Product.find();
//     console.log(`📦 تم جلب ${products.length} منتج`);
//     res.json(products);
//   } catch (error) {
//     console.error('❌ خطأ أثناء جلب المنتجات:', error.message);
//     res.status(500).json({ error: 'فشل في جلب المنتجات' });
//   }
// });


// // 🗑️ حذف منتج حسب ID
// router.delete('/:id', async (req, res) => {
//   console.log(`\n🗑️ [DELETE] /api/products/${req.params.id} - طلب حذف منتج`);

//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);

//     if (!deletedProduct) {
//       console.warn('⚠️ المنتج غير موجود');
//       return res.status(404).json({ error: 'المنتج غير موجود' });
//     }

//     // 🧹 حذف الصورة من القرص إن وجدت
//     if (deletedProduct.imagePath) {
//       const imageFullPath = path.join(__dirname, '..', deletedProduct.imagePath.replace(/^\/?/, ''));
//       if (fs.existsSync(imageFullPath)) {
//         fs.unlinkSync(imageFullPath);
//         console.log('🖼️ تم حذف صورة المنتج من القرص');
//       }
//     }

//     console.log('✅ تم حذف المنتج بنجاح');
//     res.json({ message: 'تم حذف المنتج بنجاح' });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حذف المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في حذف المنتج' });
//   }
// });


// // 📦 تصدير الراوتر
// // module.exports = router;






// // 📦 استيراد الحزم والنماذج
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const Product = require('../models/Product');

// // 🗂️ إعداد مجلد التخزين للصور
// const uploadDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
//   console.log('📁 تم إنشاء مجلد uploads تلقائيًا');
// }

// // ⚙️ إعداد التخزين باستخدام multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, uniqueName);
//   }
// });
// const upload = multer({ storage });

// /* ---------------------------------- المسارات ---------------------------------- */

// // 📥 إضافة منتج جديد مع صورة
// router.post('/add', upload.single('image'), async (req, res) => {
//   console.log('\n📨 [POST] /api/products/add - إضافة منتج جديد');

//   try {
//     const { productName, costPrice, salePrice, quantity, profitMargin, profitAmount } = req.body;

//     // ✅ تحقق من اكتمال البيانات
//     if (!productName || !costPrice || !salePrice || !quantity) {
//       console.warn('⚠️ بيانات المنتج غير مكتملة:', req.body);
//       return res.status(400).json({ error: 'البيانات غير مكتملة' });
//     }

//     // 🖼️ إعداد مسار الصورة
//     const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//     if (req.file && !fs.existsSync(req.file.path)) {
//       console.error('❌ لم يتم حفظ الصورة بشكل صحيح');
//       return res.status(400).json({ error: 'فشل في حفظ الصورة' });
//     }

//     // 🆕 إنشاء المنتج
//     const newProduct = new Product({
//       productName,
//       costPrice,
//       salePrice,
//       quantity,
//       profitMargin,
//       profitAmount,
//       imagePath
//     });

//     await newProduct.save();
//     console.log('✅ تم حفظ المنتج بنجاح:', newProduct._id);
//     res.status(201).json({ message: 'تم حفظ المنتج بنجاح', product: newProduct });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حفظ المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في حفظ المنتج' });
//   }
// });

// // 📤 جلب كل المنتجات
// router.get('/', async (req, res) => {
//   console.log('\n📨 [GET] /api/products - جلب كل المنتجات');

//   try {
//     const products = await Product.find();
//     console.log(`📦 تم جلب ${products.length} منتج`);
//     res.json(products);
//   } catch (error) {
//     console.error('❌ خطأ أثناء جلب المنتجات:', error.message);
//     res.status(500).json({ error: 'فشل في جلب المنتجات' });
//   }
// });

// // 📉 جلب المنتجات منخفضة التخزين
// router.get('/low-stock', async (req, res) => {
//   const min = Number(req.query.min) || 5;
//   console.log(`\n📉 [GET] /api/products/low-stock?min=${min} - جلب المنتجات منخفضة التخزين`);

//   try {
//     const lowStockProducts = await Product.find({ quantity: { $lte: min } });
//     console.log(`📦 تم جلب ${lowStockProducts.length} منتج منخفض التخزين`);
//     res.json(lowStockProducts);
//   } catch (error) {
//     console.error('❌ خطأ أثناء جلب المنتجات منخفضة التخزين:', error.message);
//     res.status(500).json({ error: 'فشل في جلب المنتجات منخفضة التخزين' });
//   }
// });

// // 🗑️ حذف منتج حسب ID
// router.delete('/:id', async (req, res) => {
//   console.log(`\n🗑️ [DELETE] /api/products/${req.params.id} - طلب حذف منتج`);

//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);

//     if (!deletedProduct) {
//       console.warn('⚠️ المنتج غير موجود');
//       return res.status(404).json({ error: 'المنتج غير موجود' });
//     }

//     // 🧹 حذف الصورة من القرص إن وجدت
//     if (deletedProduct.imagePath) {
//       const imageFullPath = path.join(__dirname, '..', deletedProduct.imagePath.replace(/^\/?/, ''));
//       if (fs.existsSync(imageFullPath)) {
//         fs.unlinkSync(imageFullPath);
//         console.log('🖼️ تم حذف صورة المنتج من القرص');
//       }
//     }

//     console.log('✅ تم حذف المنتج بنجاح');
//     res.json({ message: 'تم حذف المنتج بنجاح' });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حذف المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في حذف المنتج' });
//   }
// });

// // 📦 تصدير الراوتر
// module.exports = router;






// // 📦 استيراد الحزم والنماذج
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const Product = require('../models/Product');

// // 🗂️ إعداد مجلد التخزين للصور
// const uploadDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
//   console.log('📁 تم إنشاء مجلد uploads تلقائيًا');
// }

// // ⚙️ إعداد التخزين باستخدام multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, uniqueName);
//   }
// });
// const upload = multer({ storage });

// /* ---------------------------------- المسارات ---------------------------------- */

// // 📥 إضافة منتج جديد مع صورة
// router.post('/add', upload.single('image'), async (req, res) => {
//   console.log('\n📨 [POST] /api/products/add - إضافة منتج جديد');

//   try {
//     const { productName, costPrice, salePrice, quantity, profitMargin, profitAmount } = req.body;

//     if (!productName || !costPrice || !salePrice || !quantity) {
//       console.warn('⚠️ بيانات المنتج غير مكتملة:', req.body);
//       return res.status(400).json({ error: 'البيانات غير مكتملة' });
//     }

//     const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//     if (req.file && !fs.existsSync(req.file.path)) {
//       console.error('❌ لم يتم حفظ الصورة بشكل صحيح');
//       return res.status(400).json({ error: 'فشل في حفظ الصورة' });
//     }

//     const newProduct = new Product({
//       productName,
//       costPrice,
//       salePrice,
//       quantity,
//       profitMargin,
//       profitAmount,
//       imagePath
//     });

//     await newProduct.save();
//     console.log('✅ تم حفظ المنتج بنجاح:', newProduct._id);
//     res.status(201).json({ message: 'تم حفظ المنتج بنجاح', product: newProduct });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حفظ المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في حفظ المنتج' });
//   }
// });

// // 📤 جلب كل المنتجات
// router.get('/', async (req, res) => {
//   console.log('\n📨 [GET] /api/products - جلب كل المنتجات');

//   try {
//     const products = await Product.find();
//     console.log(`📦 تم جلب ${products.length} منتج`);
//     res.json(products);
//   } catch (error) {
//     console.error('❌ خطأ أثناء جلب المنتجات:', error.message);
//     res.status(500).json({ error: 'فشل في جلب المنتجات' });
//   }
// });

// // 📉 جلب المنتجات منخفضة التخزين
// router.get('/low-stock', async (req, res) => {
//   const min = Number(req.query.min) || 5;
//   console.log(`\n📉 [GET] /api/products/low-stock?min=${min} - جلب المنتجات منخفضة التخزين`);

//   try {
//     const lowStockProducts = await Product.find({ quantity: { $lte: min } });
//     console.log(`📦 تم جلب ${lowStockProducts.length} منتج منخفض التخزين`);
//     res.json(lowStockProducts);
//   } catch (error) {
//     console.error('❌ خطأ أثناء جلب المنتجات منخفضة التخزين:', error.message);
//     res.status(500).json({ error: 'فشل في جلب المنتجات منخفضة التخزين' });
//   }
// });

// // 🗑️ حذف جميع المنتجات
// router.delete('/deleteAll', async (req, res) => {
//   console.log('\n🧹 [DELETE] /api/products/deleteAll - طلب حذف جميع المنتجات');

//   try {
//     const products = await Product.find();
//     let deletedImages = 0;

//     for (const product of products) {
//       if (product.imagePath) {
//         const imageFullPath = path.join(__dirname, '..', product.imagePath.replace(/^\/?/, ''));
//         if (fs.existsSync(imageFullPath)) {
//           try {
//             fs.unlinkSync(imageFullPath);
//             deletedImages++;
//             console.log(`🖼️ تم حذف صورة المنتج: ${product.imagePath}`);
//           } catch (err) {
//             console.warn(`⚠️ فشل حذف صورة المنتج: ${product.imagePath} - ${err.message}`);
//           }
//         } else {
//           console.warn(`⚠️ الصورة غير موجودة على القرص: ${product.imagePath}`);
//         }
//       }
//     }

//     const result = await Product.deleteMany({});
//     console.log(`✅ تم حذف ${result.deletedCount} منتج من قاعدة البيانات`);
//     console.log(`🧹 تم حذف ${deletedImages} صورة من القرص`);

//     res.json({
//       message: 'تم حذف جميع المنتجات بنجاح',
//       deletedProducts: result.deletedCount,
//       deletedImages
//     });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حذف جميع المنتجات:', error);
//     res.status(500).json({
//       error: 'فشل في حذف جميع المنتجات',
//       details: error.message
//     });
//   }
// });

// // 🗑️ حذف منتج حسب ID
// router.delete('/:id', async (req, res) => {
//   console.log(`\n🗑️ [DELETE] /api/products/${req.params.id} - طلب حذف منتج`);

//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);

//     if (!deletedProduct) {
//       console.warn('⚠️ المنتج غير موجود');
//       return res.status(404).json({ error: 'المنتج غير موجود' });
//     }

//     if (deletedProduct.imagePath) {
//       const imageFullPath = path.join(__dirname, '..', deletedProduct.imagePath.replace(/^\/?/, ''));
//       if (fs.existsSync(imageFullPath)) {
//         fs.unlinkSync(imageFullPath);
//         console.log('🖼️ تم حذف صورة المنتج من القرص');
//       }
//     }

//     console.log('✅ تم حذف المنتج بنجاح');
//     res.json({ message: 'تم حذف المنتج بنجاح' });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حذف المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في حذف المنتج' });
//   }
// });

// // ✏️ تعديل منتج حسب ID
// router.put('/:id', async (req, res) => {
//   console.log(`\n✏️ [PUT] /api/products/${req.params.id} - طلب تعديل منتج`);

//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updatedProduct) {
//       console.warn('⚠️ المنتج غير موجود للتعديل');
//       return res.status(404).json({ error: 'المنتج غير موجود' });
//     }

//     console.log('✅ تم تعديل المنتج بنجاح:', updatedProduct._id);
//     res.json({ message: 'تم تعديل المنتج بنجاح', product: updatedProduct });
//   } catch (error) {
//     console.error('❌ خطأ أثناء تعديل المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في تعديل المنتج' });
//   }
// });



// // 📦 تصدير الراوتر
// module.exports = router;



// // 📦 استيراد الحزم والنماذج
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const mongoose = require('mongoose');
// const Product = require('../models/product');

// // 🗂️ إعداد مجلد التخزين للصور
// const uploadDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
//   console.log('📁 تم إنشاء مجلد uploads تلقائيًا');
// }

// // ⚙️ إعداد التخزين باستخدام multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, uniqueName);
//   }
// });
// const upload = multer({ storage });

// /* ---------------------------------- المسارات ---------------------------------- */

// // 📥 إضافة منتج جديد مع صورة
// router.post('/add', upload.single('image'), async (req, res) => {
//   console.log('\n📨 [POST] /api/products/add - إضافة منتج جديد');

//   try {
//     const { productName, costPrice, salePrice, quantity, profitMargin, profitAmount } = req.body;

//     if (!productName || !costPrice || !salePrice || !quantity) {
//       console.warn('⚠️ بيانات المنتج غير مكتملة:', req.body);
//       return res.status(400).json({ error: 'البيانات غير مكتملة' });
//     }

//     const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//     if (req.file && !fs.existsSync(req.file.path)) {
//       console.error('❌ لم يتم حفظ الصورة بشكل صحيح');
//       return res.status(400).json({ error: 'فشل في حفظ الصورة' });
//     }

//     const newProduct = new Product({
//       productName,
//       costPrice,
//       salePrice,
//       quantity,
//       profitMargin,
//       profitAmount,
//       imagePath
//     });

//     await newProduct.save();
//     console.log('✅ تم حفظ المنتج بنجاح:', newProduct._id);
//     res.status(201).json({ message: 'تم حفظ المنتج بنجاح', product: newProduct });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حفظ المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في حفظ المنتج', details: error.message });
//   }
// });

// // 📤 جلب كل المنتجات
// router.get('/', async (req, res) => {
//   console.log('\n📨 [GET] /api/products - جلب كل المنتجات');

//   try {
//     const products = await Product.find();
//     console.log(`📦 تم جلب ${products.length} منتج`);
//     res.json(products);
//   } catch (error) {
//     console.error('❌ خطأ أثناء جلب المنتجات:', error.message);
//     res.status(500).json({ error: 'فشل في جلب المنتجات' });
//   }
// });

// // 📉 جلب المنتجات منخفضة التخزين
// router.get('/low-stock', async (req, res) => {
//   const min = Number(req.query.min) || 5;
//   console.log(`\n📉 [GET] /api/products/low-stock?min=${min} - جلب المنتجات منخفضة التخزين`);

//   try {
//     const lowStockProducts = await Product.find({ quantity: { $lte: min } });
//     console.log(`📦 تم جلب ${lowStockProducts.length} منتج منخفض التخزين`);
//     res.json(lowStockProducts);
//   } catch (error) {
//     console.error('❌ خطأ أثناء جلب المنتجات منخفضة التخزين:', error.message);
//     res.status(500).json({ error: 'فشل في جلب المنتجات منخفضة التخزين' });
//   }
// });

// // 🗑️ حذف جميع المنتجات
// router.delete('/deleteAll', async (req, res) => {
//   console.log('\n🧹 [DELETE] /api/products/deleteAll - طلب حذف جميع المنتجات');

//   try {
//     const products = await Product.find();
//     let deletedImages = 0;

//     for (const product of products) {
//       if (product.imagePath) {
//         const imageFullPath = path.join(__dirname, '..', product.imagePath.replace(/^\/?/, ''));
//         if (fs.existsSync(imageFullPath)) {
//           try {
//             fs.unlinkSync(imageFullPath);
//             deletedImages++;
//             console.log(`🖼️ تم حذف صورة المنتج: ${product.imagePath}`);
//           } catch (err) {
//             console.warn(`⚠️ فشل حذف صورة المنتج: ${product.imagePath} - ${err.message}`);
//           }
//         } else {
//           console.warn(`⚠️ الصورة غير موجودة على القرص: ${product.imagePath}`);
//         }
//       }
//     }

//     const result = await Product.deleteMany({});
//     console.log(`✅ تم حذف ${result.deletedCount} منتج من قاعدة البيانات`);
//     console.log(`🧹 تم حذف ${deletedImages} صورة من القرص`);

//     res.json({
//       message: 'تم حذف جميع المنتجات بنجاح',
//       deletedProducts: result.deletedCount,
//       deletedImages
//     });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حذف جميع المنتجات:', error.message);
//     res.status(500).json({ error: 'فشل في حذف جميع المنتجات', details: error.message });
//   }
// });

// // 🗑️ حذف منتج حسب ID
// router.delete('/:id', async (req, res) => {
//   console.log(`\n🗑️ [DELETE] /api/products/${req.params.id} - طلب حذف منتج`);

//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     console.warn('⚠️ معرف المنتج غير صالح');
//     return res.status(400).json({ error: 'معرف المنتج غير صالح' });
//   }

//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);

//     if (!deletedProduct) {
//       console.warn('⚠️ المنتج غير موجود');
//       return res.status(404).json({ error: 'المنتج غير موجود' });
//     }

//     if (deletedProduct.imagePath) {
//       const imageFullPath = path.join(__dirname, '..', deletedProduct.imagePath.replace(/^\/?/, ''));
//       if (fs.existsSync(imageFullPath)) {
//         fs.unlinkSync(imageFullPath);
//         console.log('🖼️ تم حذف صورة المنتج من القرص');
//       }
//     }

//     console.log('✅ تم حذف المنتج بنجاح');
//     res.json({ message: 'تم حذف المنتج بنجاح' });
//   } catch (error) {
//     console.error('❌ خطأ أثناء حذف المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في حذف المنتج', details: error.message });
//   }
// });

// // ✏️ تعديل منتج حسب ID
// router.put('/:id', async (req, res) => {
//   console.log(`\n✏️ [PUT] /api/products/${req.params.id} - طلب تعديل منتج`);
//   console.log('📦 البيانات المستلمة:', req.body);

//   // ✅ تحقق من صلاحية الـ ID
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     console.warn('⚠️ معرف المنتج غير صالح');
//     return res.status(400).json({ error: 'معرف المنتج غير صالح' });
//   }

//   // ✅ تحقق من القيم المالية قبل التعديل
//   const { productName, costPrice, salePrice, quantity } = req.body;

//   if (!productName || costPrice == null || salePrice == null || quantity == null) {
//     console.warn('⚠️ بعض الحقول الأساسية مفقودة');
//     return res.status(400).json({ error: 'جميع الحقول الأساسية مطلوبة' });
//   }

//   if (typeof costPrice !== 'number' || typeof salePrice !== 'number' || typeof quantity !== 'number') {
//     console.warn('⚠️ نوع البيانات غير صحيح');
//     return res.status(400).json({ error: 'القيم يجب أن تكون رقمية' });
//   }

//   if (salePrice < costPrice) {
//     console.warn('⚠️ سعر البيع أقل من سعر التكلفة');
//     return res.status(400).json({ error: '💰 سعر البيع يجب أن يكون أكبر أو مساوي لسعر التكلفة' });
//   }

//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         productName,
//         costPrice,
//         salePrice,
//         quantity,
//         profitAmount: salePrice - costPrice,
//         profitMargin: costPrice > 0 ? ((salePrice - costPrice) / costPrice * 100).toFixed(2) : '0.00',
//         updatedAt: Date.now()
//       },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       console.warn('⚠️ المنتج غير موجود للتعديل');
//       return res.status(404).json({ error: 'المنتج غير موجود' });
//     }

//     console.log('✅ تم تعديل المنتج بنجاح:', updatedProduct._id);
//     res.json({ message: 'تم تعديل المنتج بنجاح', product: updatedProduct });
//   } catch (error) {
//     console.error('❌ خطأ أثناء تعديل المنتج:', error.message);
//     res.status(500).json({ error: 'فشل في تعديل المنتج', details: error.message });
//   }
// });


// // 📦 تصدير الراوتر
// module.exports = router;





const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

/* ---------------------------------- المسارات ---------------------------------- */

// 📥 إضافة منتج جديد باستخدام رابط الصورة من Cloudinary
router.post('/add', async (req, res) => {
  console.log('\n📨 [POST] /api/products/add - إضافة منتج جديد');

  try {
    const {
      productName,
      costPrice,
      salePrice,
      quantity,
      profitMargin,
      profitAmount,
      imageUrl // ✅ رابط الصورة من Cloudinary
    } = req.body;

    if (!productName || !costPrice || !salePrice || !quantity || !imageUrl) {
      console.warn('⚠️ بيانات المنتج غير مكتملة:', req.body);
      return res.status(400).json({ error: 'البيانات غير مكتملة' });
    }

    const newProduct = new Product({
      productName,
      costPrice,
      salePrice,
      quantity,
      profitMargin,
      profitAmount,
      imageUrl // ✅ حفظ الرابط مباشرة
    });

    await newProduct.save();
    console.log('✅ تم حفظ المنتج بنجاح:', newProduct._id);
    res.status(201).json({ message: 'تم حفظ المنتج بنجاح', product: newProduct });
  } catch (error) {
    console.error('❌ خطأ أثناء حفظ المنتج:', error.message);
    res.status(500).json({ error: 'فشل في حفظ المنتج', details: error.message });
  }
});

// 📤 جلب كل المنتجات
router.get('/', async (req, res) => {
  console.log('\n📨 [GET] /api/products - جلب كل المنتجات');

  try {
    const products = await Product.find();
    console.log(`📦 تم جلب ${products.length} منتج`);
    res.json(products);
  } catch (error) {
    console.error('❌ خطأ أثناء جلب المنتجات:', error.message);
    res.status(500).json({ error: 'فشل في جلب المنتجات' });
  }
});

// 📉 جلب المنتجات منخفضة التخزين
router.get('/low-stock', async (req, res) => {
  const min = Number(req.query.min) || 5;
  console.log(`\n📉 [GET] /api/products/low-stock?min=${min} - جلب المنتجات منخفضة التخزين`);

  try {
    const lowStockProducts = await Product.find({ quantity: { $lte: min } });
    console.log(`📦 تم جلب ${lowStockProducts.length} منتج منخفض التخزين`);
    res.json(lowStockProducts);
  } catch (error) {
    console.error('❌ خطأ أثناء جلب المنتجات منخفضة التخزين:', error.message);
    res.status(500).json({ error: 'فشل في جلب المنتجات منخفضة التخزين' });
  }
});

// 🗑️ حذف جميع المنتجات
router.delete('/deleteAll', async (req, res) => {
  console.log('\n🧹 [DELETE] /api/products/deleteAll - طلب حذف جميع المنتجات');

  try {
    const result = await Product.deleteMany({});
    console.log(`✅ تم حذف ${result.deletedCount} منتج من قاعدة البيانات`);
    res.json({
      message: 'تم حذف جميع المنتجات بنجاح',
      deletedProducts: result.deletedCount
    });
  } catch (error) {
    console.error('❌ خطأ أثناء حذف جميع المنتجات:', error.message);
    res.status(500).json({ error: 'فشل في حذف جميع المنتجات', details: error.message });
  }
});

// 🗑️ حذف منتج حسب ID
router.delete('/:id', async (req, res) => {
  console.log(`\n🗑️ [DELETE] /api/products/${req.params.id} - طلب حذف منتج`);

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.warn('⚠️ معرف المنتج غير صالح');
    return res.status(400).json({ error: 'معرف المنتج غير صالح' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      console.warn('⚠️ المنتج غير موجود');
      return res.status(404).json({ error: 'المنتج غير موجود' });
    }

    console.log('✅ تم حذف المنتج بنجاح');
    res.json({ message: 'تم حذف المنتج بنجاح' });
  } catch (error) {
    console.error('❌ خطأ أثناء حذف المنتج:', error.message);
    res.status(500).json({ error: 'فشل في حذف المنتج', details: error.message });
  }
});

// ✏️ تعديل منتج حسب ID
router.put('/:id', async (req, res) => {
  console.log(`\n✏️ [PUT] /api/products/${req.params.id} - طلب تعديل منتج`);
  console.log('📦 البيانات المستلمة:', req.body);

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.warn('⚠️ معرف المنتج غير صالح');
    return res.status(400).json({ error: 'معرف المنتج غير صالح' });
  }

  const { productName, costPrice, salePrice, quantity } = req.body;

  if (!productName || costPrice == null || salePrice == null || quantity == null) {
    console.warn('⚠️ بعض الحقول الأساسية مفقودة');
    return res.status(400).json({ error: 'جميع الحقول الأساسية مطلوبة' });
  }

  if (typeof costPrice !== 'number' || typeof salePrice !== 'number' || typeof quantity !== 'number') {
    console.warn('⚠️ نوع البيانات غير صحيح');
    return res.status(400).json({ error: 'القيم يجب أن تكون رقمية' });
  }

  if (salePrice < costPrice) {
    console.warn('⚠️ سعر البيع أقل من سعر التكلفة');
    return res.status(400).json({ error: '💰 سعر البيع يجب أن يكون أكبر أو مساوي لسعر التكلفة' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        costPrice,
        salePrice,
        quantity,
        profitAmount: salePrice - costPrice,
        profitMargin: costPrice > 0 ? ((salePrice - costPrice) / costPrice * 100).toFixed(2) : '0.00',
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!updatedProduct) {
      console.warn('⚠️ المنتج غير موجود للتعديل');
      return res.status(404).json({ error: 'المنتج غير موجود' });
    }

    console.log('✅ تم تعديل المنتج بنجاح:', updatedProduct._id);
    res.json({ message: 'تم تعديل المنتج بنجاح', product: updatedProduct });
  } catch (error) {
    console.error('❌ خطأ أثناء تعديل المنتج:', error.message);
    res.status(500).json({ error: 'فشل في تعديل المنتج', details: error.message });
  }
});

module.exports = router;

