// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const Product = require('../models/Product');

// // 🛒 إنشاء طلب جديد
// router.post('/', async (req, res) => {
//   try {
//     const { buyerName, products } = req.body;

//     // ✅ تحقق من صحة البيانات
//     if (!buyerName || !Array.isArray(products) || products.length === 0) {
//       console.warn('⚠️ بيانات الطلب غير مكتملة:', req.body);
//       return res.status(400).json({ error: 'البيانات غير مكتملة أو غير صالحة' });
//     }

//     let totalPrice = 0;
//     const updatedProducts = [];

//     console.log(`📥 طلب جديد من "${buyerName}" يحتوي على ${products.length} منتج`);

//     // 🔁 معالجة كل منتج في الطلب
//     for (const item of products) {
//       console.log(`🔍 التحقق من المنتج: ${item.productId}`);

//       const product = await Product.findById(item.productId);

//       // ❌ تحقق من وجود المنتج
//       if (!product) {
//         console.error(`❌ المنتج غير موجود: ${item.productId}`);
//         return res.status(404).json({ error: `المنتج غير موجود: ${item.productId}` });
//       }

//       // ❌ تحقق من توفر الكمية المطلوبة
//       if (product.quantity < item.quantity) {
//         console.warn(`⚠️ الكمية غير كافية للمنتج "${product.productName}"`);
//         return res.status(400).json({ error: `الكمية غير كافية للمنتج: ${product.productName}` });
//       }

//       // 🧮 حساب السعر الإجمالي
//       const itemTotal = product.salePrice * item.quantity;
//       totalPrice += itemTotal;

//       // 🧾 حفظ بيانات المنتج في الطلب
//       updatedProducts.push({
//         productId: product._id,
//         name: product.productName,
//         quantity: item.quantity,
//         unitPrice: product.salePrice,
//         total: itemTotal
//       });

//       // 📉 تقليل الكمية المتاحة
//       product.quantity -= item.quantity;
//       await product.save();

//       // 🔔 تنبيه إذا اقتربت الكمية من النفاد
//       if (product.quantity <= 5) {
//         console.log(`⚠️ تنبيه: المنتج "${product.productName}" يقترب من النفاد. الكمية المتبقية: ${product.quantity}`);
//       }
//     }

//     // 📝 حفظ الطلب في قاعدة البيانات
//     const newOrder = new Order({
//       buyerName,
//       products: updatedProducts,
//       totalPrice,
//       status: 'جديد' // يمكنك لاحقًا تحديث الحالة حسب سير العمل
//     });

//     await newOrder.save();

//     console.log(`✅ تم حفظ الطلب بنجاح. القيمة الإجمالية: ${totalPrice} دج`);
//     res.status(201).json({ message: '✅ تم حفظ الطلب بنجاح', order: newOrder });

//   } catch (err) {
//     console.error('❌ خطأ أثناء حفظ الطلب:', err.message);
//     res.status(500).json({ error: 'حدث خطأ أثناء حفظ الطلب' });
//   }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const Product = require('../models/Product');

// // 🛒 إنشاء طلب جديد
// router.post('/', async (req, res) => {
//   console.log('\n📨 [POST] /api/orders - استقبال طلب جديد');

//   try {
//     const { buyerName, products } = req.body;

//     // ✅ تحقق من صحة البيانات
//     if (!buyerName || !Array.isArray(products) || products.length === 0) {
//       console.warn('⚠️ بيانات الطلب غير مكتملة أو غير صالحة:', req.body);
//       return res.status(400).json({ error: 'البيانات غير مكتملة أو غير صالحة' });
//     }

//     console.log(`👤 اسم المشتري: ${buyerName}`);
//     console.log(`📦 عدد المنتجات في الطلب: ${products.length}`);

//     let totalPrice = 0;
//     const updatedProducts = [];

//     // 🔁 معالجة كل منتج في الطلب
//     for (const item of products) {
//       console.log(`\n🔍 التحقق من المنتج ID: ${item.productId}, الكمية المطلوبة: ${item.quantity}`);

//       const product = await Product.findById(item.productId);

//       // ❌ تحقق من وجود المنتج
//       if (!product) {
//         console.error(`❌ المنتج غير موجود في قاعدة البيانات: ${item.productId}`);
//         return res.status(404).json({ error: `المنتج غير موجود: ${item.productId}` });
//       }

//       console.log(`✅ المنتج موجود: ${product.productName}, الكمية المتاحة: ${product.quantity}`);

//       // ❌ تحقق من توفر الكمية المطلوبة
//       if (product.quantity < item.quantity) {
//         console.warn(`⚠️ الكمية غير كافية للمنتج "${product.productName}"`);
//         return res.status(400).json({ error: `الكمية غير كافية للمنتج: ${product.productName}` });
//       }

//       // 🧮 حساب السعر الإجمالي لهذا المنتج
//       const itemTotal = product.salePrice * item.quantity;
//       totalPrice += itemTotal;

//       console.log(`💰 سعر المنتج الواحد: ${product.salePrice} دج، الإجمالي لهذا المنتج: ${itemTotal} دج`);

//       // 🧾 حفظ بيانات المنتج في الطلب
//       updatedProducts.push({
//         productId: product._id,
//         name: product.productName,
//         quantity: item.quantity,
//         unitPrice: product.salePrice,
//         total: itemTotal
//       });

//       // 📉 تقليل الكمية المتاحة
//       product.quantity -= item.quantity;
//       await product.save();
//       console.log(`📦 تم تحديث الكمية للمنتج "${product.productName}"، الكمية الجديدة: ${product.quantity}`);

//       // 🔔 تنبيه إذا اقتربت الكمية من النفاد
//       if (product.quantity <= 5) {
//         console.log(`⚠️ تنبيه: المنتج "${product.productName}" يقترب من النفاد. الكمية المتبقية: ${product.quantity}`);
//       }
//     }

//     // 📝 حفظ الطلب في قاعدة البيانات
//     const newOrder = new Order({
//       buyerName,
//       products: updatedProducts,
//       totalPrice,
//       status: 'جديد'
//     });

//     await newOrder.save();
//     console.log(`\n✅ تم حفظ الطلب بنجاح في قاعدة البيانات`);
//     console.log(`📊 القيمة الإجمالية للطلب: ${totalPrice} دج`);
//     console.log(`🆔 رقم الطلب: ${newOrder._id}`);

//     res.status(201).json({ message: '✅ تم حفظ الطلب بنجاح', order: newOrder });

//   } catch (err) {
//     console.error('🔥 خطأ غير متوقع أثناء حفظ الطلب:', err.message);
//     res.status(500).json({ error: 'حدث خطأ أثناء حفظ الطلب' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const Product = require('../models/Product');

// // 🛒 إنشاء طلب جديد
// router.post('/', async (req, res) => {
//   console.log('\n📨 [POST] /api/orders - استقبال طلب جديد');

//   try {
//     // 🧾 استخراج البيانات من جسم الطلب
//     const { buyerName, products } = req.body;

//     // ✅ تحقق من صحة البيانات الأساسية
//     if (!buyerName || !Array.isArray(products) || products.length === 0) {
//       console.warn('⚠️ بيانات الطلب غير مكتملة أو غير صالحة:', req.body);
//       return res.status(400).json({ error: 'البيانات غير مكتملة أو غير صالحة' });
//     }

//     console.log(`👤 اسم المشتري: ${buyerName}`);
//     console.log(`📦 عدد المنتجات في الطلب: ${products.length}`);

//     let totalPrice = 0; // 💰 لتجميع السعر الإجمالي
//     const updatedProducts = []; // 🧾 لتجميع تفاصيل المنتجات داخل الطلب

//     // 🔁 معالجة كل منتج في الطلب
//     for (const item of products) {
//       console.log(`\n🔍 التحقق من المنتج ID: ${item.productId}, الكمية المطلوبة: ${item.quantity}`);

//       // 📡 جلب المنتج من قاعدة البيانات
//       const product = await Product.findById(item.productId);

//       // ❌ تحقق من وجود المنتج
//       if (!product) {
//         console.error(`❌ المنتج غير موجود في قاعدة البيانات: ${item.productId}`);
//         return res.status(404).json({ error: `المنتج غير موجود: ${item.productId}` });
//       }

//       console.log(`✅ المنتج موجود: ${product.productName}, الكمية المتاحة: ${product.quantity}`);

//       // ❌ تحقق من توفر الكمية المطلوبة
//       if (product.quantity < item.quantity) {
//         console.warn(`⚠️ الكمية غير كافية للمنتج "${product.productName}"`);
//         return res.status(400).json({ error: `الكمية غير كافية للمنتج: ${product.productName}` });
//       }

//       // 🧮 حساب السعر الإجمالي لهذا المنتج
//       const itemTotal = product.salePrice * item.quantity;
//       totalPrice += itemTotal;

//       console.log(`💰 سعر المنتج الواحد: ${product.salePrice} دج، الإجمالي لهذا المنتج: ${itemTotal} دج`);

//       // 🧾 حفظ بيانات المنتج داخل الطلب
//       updatedProducts.push({
//         productId: product._id,
//         name: product.productName,
//         quantity: item.quantity,
//         unitPrice: product.salePrice,
//         total: itemTotal
//       });

//       // 📉 تحديث الكمية المتاحة في المخزون
//       product.quantity -= item.quantity;
//       await product.save();
//       console.log(`📦 تم تحديث الكمية للمنتج "${product.productName}"، الكمية الجديدة: ${product.quantity}`);

//       // 🔔 تنبيه إذا اقتربت الكمية من النفاد
//       if (product.quantity <= 5) {
//         console.log(`⚠️ تنبيه: المنتج "${product.productName}" يقترب من النفاد. الكمية المتبقية: ${product.quantity}`);
//       }
//     }

//     // 📝 إنشاء كائن الطلب وحفظه في قاعدة البيانات
//     const newOrder = new Order({
//       buyerName,
//       products: updatedProducts,
//       totalPrice,
//       status: 'جديد' // يمكنك لاحقًا تحديث الحالة حسب سير العمل
//     });

//     await newOrder.save();

//     console.log(`\n✅ تم حفظ الطلب بنجاح في قاعدة البيانات`);
//     console.log(`📊 القيمة الإجمالية للطلب: ${totalPrice} دج`);
//     console.log(`🆔 رقم الطلب: ${newOrder._id}`);

//     // 📤 إرسال الرد للواجهة الأمامية
//     res.status(201).json({ message: '✅ تم حفظ الطلب بنجاح', order: newOrder });

//   } catch (err) {
//     // 🔥 معالجة أي خطأ غير متوقع
//     console.error('🔥 خطأ غير متوقع أثناء حفظ الطلب:', err.message);
//     res.status(500).json({ error: 'حدث خطأ أثناء حفظ الطلب' });
//   }
// });

// module.exports = router;


// // 📦 استيراد الحزم والنماذج
// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const Product = require('../models/Product');


// // 📥 جلب كل الطلبات
// router.get('/', async (req, res) => {
//   console.log('\n📨 [GET] /api/orders - طلب جلب جميع الطلبات');

//   try {
//     const orders = await Order.find();
//     console.log(`📦 تم جلب ${orders.length} طلب من قاعدة البيانات`);
//     res.json(orders);
//   } catch (err) {
//     console.error('❌ خطأ أثناء جلب الطلبات:', err.message);
//     res.status(500).json({ error: 'فشل في جلب الطلبات' });
//   }
// });


// // 🛒 إنشاء طلب جديد
// router.post('/', async (req, res) => {
//   console.log('\n📨 [POST] /api/orders - استقبال طلب جديد');

//   try {
//     const { buyerName, products } = req.body;

//     // ✅ تحقق من صحة البيانات
//     if (!buyerName || !Array.isArray(products) || products.length === 0) {
//       console.warn('⚠️ بيانات الطلب غير مكتملة أو غير صالحة:', req.body);
//       return res.status(400).json({ error: 'البيانات غير مكتملة أو غير صالحة' });
//     }

//     console.log(`👤 اسم المشتري: ${buyerName}`);
//     console.log(`📦 عدد المنتجات في الطلب: ${products.length}`);

//     let totalPrice = 0;
//     const updatedProducts = [];

//     for (const item of products) {
//       console.log(`🔍 التحقق من المنتج ID: ${item.productId}, الكمية المطلوبة: ${item.quantity}`);

//       const product = await Product.findById(item.productId);

//       if (!product) {
//         console.warn(`❌ المنتج غير موجود: ${item.productId}`);
//         return res.status(404).json({ error: `المنتج غير موجود: ${item.productId}` });
//       }

//       // ✅ حساب السعر الإجمالي
//       const itemTotal = product.salePrice * item.quantity;
//       totalPrice += itemTotal;

//       // 🧮 تحديث الكمية المتوفرة
//       product.quantity -= item.quantity;
//       await product.save();

//       updatedProducts.push({
//         productId: product._id,
//         productName: product.productName,
//         quantity: item.quantity,
//         unitPrice: product.salePrice,
//         total: itemTotal
//       });
//     }

//     // 🆕 إنشاء الطلب الجديد
//     const newOrder = new Order({
//       buyerName,
//       products: updatedProducts,
//       totalPrice,
//       createdAt: new Date()
//     });

//     await newOrder.save();
//     console.log('✅ تم حفظ الطلب بنجاح');
//     res.status(201).json({ message: 'تم حفظ الطلب بنجاح', order: newOrder });
//   } catch (err) {
//     console.error('❌ خطأ أثناء إنشاء الطلب:', err.message);
//     res.status(500).json({ error: 'فشل في إنشاء الطلب' });
//   }
// });


// // 🗑️ حذف طلب حسب ID
// router.delete('/:id', async (req, res) => {
//   console.log(`\n🗑️ [DELETE] /api/orders/${req.params.id} - طلب حذف`);

//   try {
//     const deletedOrder = await Order.findByIdAndDelete(req.params.id);

//     if (!deletedOrder) {
//       console.warn('⚠️ الطلب غير موجود');
//       return res.status(404).json({ error: 'الطلب غير موجود' });
//     }

//     console.log('✅ تم حذف الطلب بنجاح');
//     res.json({ message: 'تم حذف الطلب بنجاح' });
//   } catch (err) {
//     console.error('❌ خطأ أثناء حذف الطلب:', err.message);
//     res.status(500).json({ error: 'فشل في حذف الطلب' });
//   }
// });


// // 📦 تصدير الراوتر
// module.exports = router;



// // 📦 استيراد الحزم والنماذج
// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const Product = require('../models/Product');

// // 📥 جلب كل الطلبات
// router.get('/', async (req, res) => {
//   console.log('\n📨 [GET] /api/orders - طلب جلب جميع الطلبات');

//   try {
//     const orders = await Order.find();
//     console.log(`📦 تم جلب ${orders.length} طلب من قاعدة البيانات`);
//     res.json(orders);
//   } catch (err) {
//     console.error('❌ خطأ أثناء جلب الطلبات:', err.message);
//     res.status(500).json({ error: 'فشل في جلب الطلبات' });
//   }
// });

// // 🛒 إنشاء طلب جديد
// router.post('/', async (req, res) => {
//   console.log('\n📨 [POST] /api/orders - استقبال طلب جديد');

//   try {
//     const { buyerName, products } = req.body;

//     // ✅ تحقق من صحة البيانات
//     if (!buyerName || !Array.isArray(products) || products.length === 0) {
//       console.warn('⚠️ بيانات الطلب غير مكتملة أو غير صالحة:', req.body);
//       return res.status(400).json({ error: 'البيانات غير مكتملة أو غير صالحة' });
//     }

//     console.log(`👤 اسم المشتري: ${buyerName}`);
//     console.log(`📦 عدد المنتجات في الطلب: ${products.length}`);

//     let totalPrice = 0;
//     const updatedProducts = [];

//     for (const item of products) {
//       console.log(`🔍 التحقق من المنتج ID: ${item.productId}, الكمية المطلوبة: ${item.quantity}`);

//       const product = await Product.findById(item.productId);

//       if (!product) {
//         console.warn(`❌ المنتج غير موجود: ${item.productId}`);
//         return res.status(404).json({ error: `المنتج غير موجود: ${item.productId}` });
//       }

//       // 🧮 حساب هامش الربح
//       const costPrice = product.costPrice || 0;
//       const salePrice = product.salePrice || 0;
//       const profitAmount = salePrice - costPrice;
//       const profitMargin = costPrice > 0 ? ((profitAmount / costPrice) * 100).toFixed(2) : '0.00';

//       // ✅ حساب السعر الإجمالي للمنتج
//       const itemTotal = salePrice * item.quantity;
//       totalPrice += itemTotal;

//       // 🧮 تحديث الكمية المتوفرة في المخزون
//       product.quantity -= item.quantity;
//       await product.save();

//       // 📦 حفظ كل بيانات المنتج داخل الطلب
//       updatedProducts.push({
//         productId: product._id,
//         productName: product.productName,
//         salePrice,
//         costPrice,
//         profitAmount,
//         profitMargin,
//         image: product.imagePath || '',
//         quantity: item.quantity,
//         total: itemTotal
//       });

//       console.log(`✅ المنتج المضاف: ${product.productName} | الكمية: ${item.quantity} | الربح: ${profitAmount} دج (${profitMargin}%)`);
//     }

//     // 🆕 إنشاء الطلب الجديد
//     const newOrder = new Order({
//       buyerName,
//       products: updatedProducts,
//       totalPrice,
//       createdAt: new Date()
//     });

//     await newOrder.save();
//     console.log('✅ تم حفظ الطلب بنجاح');
//     res.status(201).json({ message: 'تم حفظ الطلب بنجاح', order: newOrder });
//   } catch (err) {
//     console.error('❌ خطأ أثناء إنشاء الطلب:', err.message);
//     res.status(500).json({ error: 'فشل في إنشاء الطلب' });
//   }
// });

// // 🗑️ حذف طلب حسب ID
// router.delete('/:id', async (req, res) => {
//   console.log(`\n🗑️ [DELETE] /api/orders/${req.params.id} - طلب حذف`);

//   try {
//     const deletedOrder = await Order.findByIdAndDelete(req.params.id);

//     if (!deletedOrder) {
//       console.warn('⚠️ الطلب غير موجود');
//       return res.status(404).json({ error: 'الطلب غير موجود' });
//     }

//     console.log('✅ تم حذف الطلب بنجاح');
//     res.json({ message: 'تم حذف الطلب بنجاح' });
//   } catch (err) {
//     console.error('❌ خطأ أثناء حذف الطلب:', err.message);
//     res.status(500).json({ error: 'فشل في حذف الطلب' });
//   }
// });

// // 📦 تصدير الراوتر




// // 📦 استيراد الحزم والنماذج
// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const Product = require('../models/Product');

// /* ---------------------------------- المسارات ---------------------------------- */

// // 📥 جلب كل الطلبات
// router.get('/', async (req, res) => {
//   console.log('\n📨 [GET] /api/orders - طلب جلب جميع الطلبات');

//   try {
//     const orders = await Order.find();
//     console.log(`📦 تم جلب ${orders.length} طلب من قاعدة البيانات`);
//     res.json(orders);
//   } catch (err) {
//     console.error('❌ خطأ أثناء جلب الطلبات:', err.message);
//     res.status(500).json({ error: 'فشل في جلب الطلبات' });
//   }
// });

// // 🛒 إنشاء طلب جديد
// router.post('/', async (req, res) => {
//   console.log('\n📨 [POST] /api/orders - استقبال طلب جديد');

//   try {
//     const { buyerName, products } = req.body;

//     // ✅ تحقق من صحة البيانات
//     if (!buyerName || !Array.isArray(products) || products.length === 0) {
//       console.warn('⚠️ بيانات الطلب غير مكتملة أو غير صالحة:', req.body);
//       return res.status(400).json({ error: 'البيانات غير مكتملة أو غير صالحة' });
//     }

//     console.log(`👤 اسم المشتري: ${buyerName}`);
//     console.log(`📦 عدد المنتجات في الطلب: ${products.length}`);

//     let totalPrice = 0;
//     const updatedProducts = [];

//     for (const item of products) {
//       console.log(`🔍 التحقق من المنتج ID: ${item.productId}, الكمية المطلوبة: ${item.quantity}`);

//       const product = await Product.findById(item.productId);

//       if (!product) {
//         console.warn(`❌ المنتج غير موجود: ${item.productId}`);
//         return res.status(404).json({ error: `المنتج غير موجود: ${item.productId}` });
//       }

//       // 🧮 حساب هامش الربح
//       const costPrice = product.costPrice || 0;
//       const salePrice = product.salePrice || 0;
//       const profitAmount = salePrice - costPrice;
//       const profitMargin = costPrice > 0 ? ((profitAmount / costPrice) * 100).toFixed(2) : '0.00';

//       // ✅ حساب السعر الإجمالي للمنتج
//       const itemTotal = salePrice * item.quantity;
//       totalPrice += itemTotal;

//       // 🧮 تحديث الكمية المتوفرة في المخزون
//       product.quantity -= item.quantity;
//       await product.save();

//       // 📦 حفظ كل بيانات المنتج داخل الطلب
//       updatedProducts.push({
//         productId: product._id,
//         productName: product.productName,
//         salePrice,
//         costPrice,
//         profitAmount,
//         profitMargin,
//         image: product.imagePath || '',
//         quantity: item.quantity,
//         total: itemTotal
//       });

//       console.log(`✅ المنتج المضاف: ${product.productName} | الكمية: ${item.quantity} | الربح: ${profitAmount} دج (${profitMargin}%)`);
//     }

//     // 🆕 إنشاء الطلب الجديد
//     const newOrder = new Order({
//       buyerName,
//       products: updatedProducts,
//       totalPrice,
//       createdAt: new Date()
//     });

//     await newOrder.save();
//     console.log('✅ تم حفظ الطلب بنجاح');
//     res.status(201).json({ message: 'تم حفظ الطلب بنجاح', order: newOrder });
//   } catch (err) {
//     console.error('❌ خطأ أثناء إنشاء الطلب:', err.message);
//     res.status(500).json({ error: 'فشل في إنشاء الطلب' });
//   }
// });



// router.delete('/deleteAll', async (req, res) => {
//   console.log('\n🧹 [DELETE] /api/orders/deleteAll - طلب حذف جميع الطلبات');

//   try {
//     // تحقق من وجود النموذج
//     if (!Order || typeof Order.deleteMany !== 'function') {
//       throw new Error('نموذج Order غير معرف أو deleteMany غير متاح');
//     }

//     const result = await Order.deleteMany({});
//     console.log(`✅ تم حذف ${result.deletedCount} طلب`);
//     res.json({ message: 'تم حذف جميع الطلبات بنجاح', deletedCount: result.deletedCount });
//   } catch (err) {
//     console.error('❌ خطأ أثناء حذف جميع الطلبات:', err); // اطبع الخطأ بالكامل
//     res.status(500).json({ error: 'فشل في حذف جميع الطلبات', details: err.message });
//   }
// });


// // 🧹 حذف جميع الطلبات
// router.delete('/deleteAll', async (req, res) => {
//   console.log('\n🧹 [DELETE] /api/orders/deleteAll - طلب حذف جميع الطلبات');

//   try {
//     // ✅ تحقق من وجود النموذج
//     if (!Order || typeof Order.deleteMany !== 'function') {
//       throw new Error('نموذج Order غير معرف أو deleteMany غير متاح');
//     }

//     const result = await Order.deleteMany({});
//     console.log(`✅ تم حذف ${result.deletedCount} طلب من قاعدة البيانات`);
//     res.json({ message: 'تم حذف جميع الطلبات بنجاح', deletedCount: result.deletedCount });
//   } catch (err) {
//     console.error('❌ خطأ أثناء حذف جميع الطلبات:', err);
//     res.status(500).json({ error: 'فشل في حذف جميع الطلبات', details: err.message });
//   }
// });

// // 📦 تصدير الراوتر
// module.exports = router;




// 📦 استيراد الحزم والنماذج
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/product');

/* ---------------------------------- المسارات ---------------------------------- */

// 📥 جلب كل الطلبات
router.get('/', async (req, res) => {
  console.log('\n📨 [GET] /api/orders - طلب جلب جميع الطلبات');

  try {
    const orders = await Order.find();
    console.log(`📦 تم جلب ${orders.length} طلب من قاعدة البيانات`);
    res.json(orders);
  } catch (err) {
    console.error('❌ خطأ أثناء جلب الطلبات:', err.message);
    res.status(500).json({ error: 'فشل في جلب الطلبات' });
  }
});

// 🛒 إنشاء طلب جديد
router.post('/', async (req, res) => {
  console.log('\n📨 [POST] /api/orders - استقبال طلب جديد');

  try {
    const { buyerName, products, partners = [] } = req.body;

    // ✅ تحقق من صحة البيانات
    if (!buyerName || !Array.isArray(products) || products.length === 0) {
      console.warn('⚠️ بيانات الطلب غير مكتملة أو غير صالحة:', req.body);
      return res.status(400).json({ error: 'البيانات غير مكتملة أو غير صالحة' });
    }

    console.log(`👤 اسم المشتري: ${buyerName}`);
    console.log(`📦 عدد المنتجات في الطلب: ${products.length}`);

    let totalPrice = 0;
    let discountTotal = 0;
    const updatedProducts = [];

    for (const item of products) {
      console.log(`🔍 التحقق من المنتج ID: ${item.productId}, الكمية المطلوبة: ${item.quantity}`);

      const product = await Product.findById(item.productId);
      if (!product) {
        console.warn(`❌ المنتج غير موجود: ${item.productId}`);
        return res.status(404).json({ error: `المنتج غير موجود: ${item.productId}` });
      }

      // 🧮 حساب هامش الربح
      const costPrice = product.costPrice || 0;
      const salePrice = product.salePrice || 0;
      const discount = item.discount || 0;
      const finalPrice = salePrice - discount;

      const profitAmount = finalPrice - costPrice;
      const profitMargin = costPrice > 0 ? ((profitAmount / costPrice) * 100).toFixed(2) : '0.00';

      // ✅ حساب السعر الإجمالي للمنتج بعد الخصم
      const itemTotal = finalPrice * item.quantity;
      totalPrice += itemTotal;
      discountTotal += discount * item.quantity;

      // 🧮 تحديث الكمية المتوفرة في المخزون
      product.quantity -= item.quantity;
      await product.save();

      // 📦 حفظ كل بيانات المنتج داخل الطلب
      updatedProducts.push({
        productId: product._id,
        productName: product.productName,
        salePrice,
        costPrice,
        profitAmount,
        profitMargin,
        discount,
        image: product.imagePath || '',
        quantity: item.quantity,
        total: itemTotal
      });

      console.log(`✅ المنتج: ${product.productName} | خصم: ${discount} دج | الربح: ${profitAmount} دج (${profitMargin}%)`);
    }

    // 🆕 إنشاء الطلب الجديد
    const newOrder = new Order({
      buyerName,
      products: updatedProducts,
      totalPrice,
      discountTotal,
      partners,
      createdAt: new Date()
    });

    await newOrder.save();
    console.log('✅ تم حفظ الطلب بنجاح');
    res.status(201).json({ message: 'تم حفظ الطلب بنجاح', order: newOrder });
  } catch (err) {
    console.error('❌ خطأ أثناء إنشاء الطلب:', err.message);
    res.status(500).json({ error: 'فشل في إنشاء الطلب' });
  }
});

// 🧹 حذف جميع الطلبات
router.delete('/deleteAll', async (req, res) => {
  console.log('\n🧹 [DELETE] /api/orders/deleteAll - طلب حذف جميع الطلبات');

  try {
    if (!Order || typeof Order.deleteMany !== 'function') {
      throw new Error('نموذج Order غير معرف أو deleteMany غير متاح');
    }

    const result = await Order.deleteMany({});
    console.log(`✅ تم حذف ${result.deletedCount} طلب من قاعدة البيانات`);
    res.json({ message: 'تم حذف جميع الطلبات بنجاح', deletedCount: result.deletedCount });
  } catch (err) {
    console.error('❌ خطأ أثناء حذف جميع الطلبات:', err);
    res.status(500).json({ error: 'فشل في حذف جميع الطلبات', details: err.message });
  }
});




// 🗑️ حذف طلب واحد حسب ID
router.delete('/:id', async (req, res) => {
  const orderId = req.params.id;
  console.log(`\n🗑️ [DELETE] /api/orders/${orderId} - طلب حذف طلب`);

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      console.warn(`❌ الطلب غير موجود: ${orderId}`);
      return res.status(404).json({ error: 'الطلب غير موجود' });
    }

    console.log(`✅ تم حذف الطلب بنجاح: ${orderId}`);
    res.json({ message: 'تم حذف الطلب بنجاح', deletedOrder });
  } catch (err) {
    console.error(`❌ خطأ أثناء حذف الطلب (${orderId}):`, err.message);
    res.status(500).json({ error: 'فشل في حذف الطلب' });
  }
});


// 📦 تصدير الراوتر
module.exports = router;









