// // routes/discounts.js
// const express = require('express');
// const router = express.Router();
// const Discount = require('../models/Discount');
// const Order = require('../models/Order'); // تأكد من وجوده

// router.post('/apply', async (req, res) => {
//   const { discountRate, discountAmount, discountReason } = req.body;

//   try {
//     // حفظ الخصم
//     const discount = await Discount.create({
//       discountRate,
//       discountAmount,
//       discountReason
//     });

//     // حساب الأرباح من الطلبات
//     const orders = await Order.find();
//     let totalProfit = 0;

//     orders.forEach(order => {
//       order.products.forEach(p => {
//         const price = p.salePrice || 0;
//         const cost = p.costPrice || 0;
//         const quantity = p.quantity || 0;
//         const discountRate = p.discountRate || 0;
//         const grossProfit = (price - cost) * quantity;
//         const discountValue = (price * quantity) * (discountRate / 100);
//         totalProfit += grossProfit - discountValue;
//       });
//     });

//     const discountFromPercent = totalProfit * (discountRate / 100);
//     const totalDiscount = discountAmount + discountFromPercent;
//     const netProfit = totalProfit - totalDiscount;

//     res.json({
//       success: true,
//       discount,
//       totalProfit: totalProfit.toFixed(2),
//       totalDiscount: totalDiscount.toFixed(2),
//       netProfit: netProfit.toFixed(2)
//     });
//   } catch (err) {
//     console.error('❌ خطأ في حفظ الخصم:', err);
//     res.status(500).json({ success: false, message: 'فشل حفظ الخصم' });
//   }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const Discount = require('../models/Discount');
// const Order = require('../models/Order'); // تأكد من أن Order يحتوي على المنتجات مع الأسعار والتكلفة والكمية

// // ✅ حفظ أو تحديث الخصم وتطبيقه على الأرباح
// router.post('/apply', async (req, res) => {
//   const { discountRate, discountAmount, discountReason } = req.body;

//   try {
//     // 📝 تحديث الخصم العام أو إنشاؤه
//     await Discount.updateOne(
//       { _id: 'global-discount' },
//       {
//         $set: {
//           discountRate,
//           discountAmount,
//           discountReason,
//           appliedAt: new Date()
//         }
//       },
//       { upsert: true }
//     );

//     // 📦 جلب الطلبات لحساب الأرباح
//     const orders = await Order.find();
//     let totalProfit = 0;

//     orders.forEach(order => {
//       order.products.forEach(p => {
//         const price = p.salePrice || 0;
//         const cost = p.costPrice || 0;
//         const quantity = p.quantity || 0;
//         const itemDiscountRate = p.discountRate || 0;

//         const grossProfit = (price - cost) * quantity;
//         const discountValue = (price * quantity) * (itemDiscountRate / 100);
//         totalProfit += grossProfit - discountValue;
//       });
//     });

//     // 📉 تطبيق الخصم العام
//     const discountFromPercent = totalProfit * (discountRate / 100);
//     const totalDiscount = discountAmount + discountFromPercent;
//     const netProfit = totalProfit - totalDiscount;

//     // ✅ إرسال النتائج
//     res.json({
//       success: true,
//       discount: { discountRate, discountAmount, discountReason },
//       totalProfit: totalProfit.toFixed(2),
//       totalDiscount: totalDiscount.toFixed(2),
//       netProfit: netProfit.toFixed(2)
//     });
//   } catch (err) {
//     console.error('❌ خطأ في حفظ الخصم:', err);
//     res.status(500).json({ success: false, message: 'فشل حفظ الخصم' });
//   }
// });

// // ✅ جلب الخصم المحفوظ عند تحميل الصفحة
// router.get('/', async (req, res) => {
//   try {
//     const discount = await Discount.findOne({ _id: 'global-discount' });
//     res.json(discount || {
//       discountRate: 0,
//       discountAmount: 0,
//       discountReason: '',
//       appliedAt: null
//     });
//   } catch (err) {
//     console.error('❌ فشل في جلب الخصم:', err);
//     res.status(500).json({ success: false, message: 'فشل في جلب الخصم' });
//   }
// });

// // ✅ مسار بديل لجلب الخصم باستخدام /latest
// router.get('/latest', async (req, res) => {
//   try {
//     const discount = await Discount.findOne({ _id: 'global-discount' });
//     res.json(discount || {
//       discountRate: 0,
//       discountAmount: 0,
//       discountReason: '',
//       appliedAt: null
//     });
//   } catch (err) {
//     console.error('❌ فشل في جلب الخصم:', err);
//     res.status(500).json({ success: false, message: 'فشل في جلب الخصم' });
//   }
// });

// module.exports = router;




// 📁 routes/discounts.js
const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');
const Order = require('../models/Order'); // تأكد أن المنتجات داخل الطلب تحتوي على salePrice و costPrice و quantity

// ✅ حفظ خصم جديد وتطبيقه على الأرباح
router.post('/apply', async (req, res) => {
  const { discountRate = 0, discountAmount = 0, discountReason = '' } = req.body;

  console.log('📥 طلب تطبيق خصم جديد');
  console.log('🧾 البيانات المستلمة:', { discountRate, discountAmount, discountReason });

  try {
    // 📝 حفظ الخصم الجديد في قاعدة البيانات
    const newDiscount = new Discount({
      discountRate,
      discountAmount,
      discountReason,
      appliedAt: new Date()
    });

    await newDiscount.save();
    console.log('✅ تم حفظ الخصم في قاعدة البيانات:', newDiscount);

    // 📦 جلب جميع الطلبات لحساب الربح الإجمالي
    const orders = await Order.find();
    let totalProfit = 0;

    orders.forEach(order => {
      order.products.forEach(p => {
        const price = p.salePrice || 0;
        const cost = p.costPrice || 0;
        const quantity = p.quantity || 0;
        const itemDiscountRate = p.discountRate || 0;

        const grossProfit = (price - cost) * quantity;
        const discountValue = (price * quantity) * (itemDiscountRate / 100);
        totalProfit += grossProfit - discountValue;
      });
    });

    console.log('📊 الربح الإجمالي قبل الخصم:', totalProfit.toFixed(2));

    // 📉 حساب الخصم المطبق
    const discountFromPercent = totalProfit * (discountRate / 100);
    const totalDiscount = discountAmount + discountFromPercent;
    const netProfit = totalProfit - totalDiscount;

    console.log('💸 الخصم الإجمالي:', totalDiscount.toFixed(2));
    console.log('📈 الربح بعد الخصم:', netProfit.toFixed(2));

    // ✅ إرسال النتائج للواجهة
    res.json({
      success: true,
      discount: newDiscount,
      totalProfit: totalProfit.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      netProfit: netProfit.toFixed(2)
    });
  } catch (err) {
    console.error('❌ خطأ أثناء حفظ الخصم أو حساب الأرباح:', err);
    res.status(500).json({ success: false, message: 'فشل في تطبيق الخصم' });
  }
});

// ✅ جلب جميع الخصومات المحفوظة
router.get('/', async (req, res) => {
  console.log('📡 طلب جلب جميع الخصومات');
  try {
    const discounts = await Discount.find().sort({ appliedAt: -1 });
    console.log(`📦 تم جلب ${discounts.length} خصم`);
    res.json(discounts);
  } catch (err) {
    console.error('❌ فشل في جلب الخصومات:', err);
    res.status(500).json({ success: false, message: 'فشل في جلب الخصومات' });
  }
});

// ✅ جلب آخر خصم تم تطبيقه
router.get('/latest', async (req, res) => {
  console.log('📡 طلب جلب آخر خصم');
  try {
    const latest = await Discount.findOne().sort({ appliedAt: -1 });
    if (latest) {
      console.log('🧾 آخر خصم:', latest);
      res.json(latest);
    } else {
      console.log('⚠️ لا يوجد خصم محفوظ');
      res.json({
        discountRate: 0,
        discountAmount: 0,
        discountReason: '',
        appliedAt: null
      });
    }
  } catch (err) {
    console.error('❌ فشل في جلب آخر خصم:', err);
    res.status(500).json({ success: false, message: 'فشل في جلب آخر خصم' });
  }
});

// ✅ حذف خصم حسب المعرف
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('🗑️ طلب حذف خصم:', id);

  try {
    const deleted = await Discount.findByIdAndDelete(id);

    if (!deleted) {
      console.warn('⚠️ الخصم غير موجود في قاعدة البيانات');
      return res.status(404).json({ success: false, message: 'الخصم غير موجود' });
    }

    console.log('✅ تم حذف الخصم بنجاح:', deleted);
    res.json({ success: true, message: 'تم حذف الخصم بنجاح' });
  } catch (err) {
    console.error('❌ خطأ أثناء حذف الخصم:', err);
    res.status(500).json({ success: false, message: 'فشل في حذف الخصم' });
  }
});


module.exports = router;
