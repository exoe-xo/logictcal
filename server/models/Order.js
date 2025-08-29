// 📁 models/Order.js
// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   buyerName: { type: String, required: true },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//       name: String,
//       quantity: Number,
//       price: Number,
//     }
//   ],
//   totalPrice: Number,
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Order', orderSchema);


// 📁 models/Order.js
// const mongoose = require('mongoose');

// const partnerSchema = new mongoose.Schema({
//   name: String,
//   share: Number // نسبة الشريك
// });

// // 🧾 تعريف مخطط الطلب
// const orderSchema = new mongoose.Schema({
//   // 👤 اسم المشتري
//   buyerName: { type: String, required: true },

//   // 📦 قائمة المنتجات داخل الطلب
//   products: [
//     {
//       // 🆔 معرف المنتج الأصلي (لأغراض الربط فقط)
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },

//       // 📝 اسم المنتج عند لحظة الطلب
//       productName: { type: String, required: true },

//       // 💰 سعر البيع للوحدة
//       salePrice: { type: Number, required: true },

//       // 🧾 سعر التكلفة للوحدة
//       costPrice: { type: Number, required: true },

//       // 📈 هامش الربح (المبلغ)
//       profitAmount: { type: Number, required: true },

//       // 📊 نسبة الربح %
//       profitMargin: { type: String, required: true },

//       // 🖼️ رابط الصورة أو المسار
//       image: { type: String },

//       // 🔢 الكمية المطلوبة
//       quantity: { type: Number, required: true },

//       // 💵 السعر الإجمالي لهذا المنتج
//       total: { type: Number, required: true }
//     }
//   ],

//   // 💰 السعر الإجمالي للطلب
//   totalPrice: { type: Number, required: true },

//   // 🕒 تاريخ الإنشاء
//   createdAt: { type: Date, default: Date.now }
// });

// // 🧠 إنشاء النموذج وتصديره
// module.exports = mongoose.model('Order', orderSchema);



// // 📁 models/Order.js
// const mongoose = require('mongoose');

// // 👥 تعريف الشركاء في الطلب (اختياري)
// const partnerSchema = new mongoose.Schema({
//   name: { type: String, required: true },     // اسم الشريك
//   share: { type: Number, required: true }     // نسبة الشريك من الأرباح (مثلاً 30%)
// });

// // 🧾 تعريف مخطط الطلب
// const orderSchema = new mongoose.Schema({
//   // 👤 اسم المشتري
//   buyerName: { type: String, required: true },

//   // 📦 قائمة المنتجات داخل الطلب
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // 🆔 معرف المنتج
//       productName: { type: String, required: true },                        // 📝 اسم المنتج
//       salePrice: { type: Number, required: true },                          // 💰 سعر البيع
//       costPrice: { type: Number, required: true },                          // 🧾 سعر التكلفة
//       profitAmount: { type: Number, required: true },                       // 📈 هامش الربح
//       profitMargin: { type: String, required: true },                       // 📊 نسبة الربح
//       image: { type: String },                                              // 🖼️ صورة المنتج
//       quantity: { type: Number, required: true },                           // 🔢 الكمية
//       total: { type: Number, required: true }                               // 💵 السعر الإجمالي
//     }
//   ],

//   // 👥 قائمة الشركاء المرتبطين بالطلب (اختياري)
//   partners: [partnerSchema],

//   // 💰 السعر الإجمالي للطلب
//   totalPrice: { type: Number, required: true },

//   // 🕒 تاريخ الإنشاء
//   createdAt: { type: Date, default: Date.now }
// });

// // 🧠 إنشاء النموذج وتصديره
// module.exports = mongoose.model('Order', orderSchema);



const mongoose = require('mongoose');

// 👥 تعريف الشركاء في الطلب (اختياري)
const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },     // اسم الشريك
  share: { type: Number, required: true }     // نسبة الشريك من الأرباح (مثلاً 30%)
});

// 🧾 تعريف مخطط الطلب
const orderSchema = new mongoose.Schema({
  // 👤 اسم المشتري
  buyerName: { type: String, required: true },

  // 📦 قائمة المنتجات داخل الطلب
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // 🆔 معرف المنتج
      productName: { type: String, required: true },                        // 📝 اسم المنتج
      salePrice: { type: Number, required: true },                          // 💰 سعر البيع
      costPrice: { type: Number, required: true },                          // 🧾 سعر التكلفة
      profitAmount: { type: Number, required: true },                       // 📈 هامش الربح
      profitMargin: { type: String, required: true },                       // 📊 نسبة الربح
      discount: { type: Number, default: 0 },                               // 💸 الخصم المطبق
      image: { type: String },                                              // 🖼️ صورة المنتج
      quantity: { type: Number, required: true },                           // 🔢 الكمية
      total: { type: Number, required: true }                               // 💵 السعر الإجمالي بعد الخصم
    }
  ],

  // 👥 قائمة الشركاء المرتبطين بالطلب (اختياري)
  partners: [partnerSchema],

  // 💰 السعر الإجمالي للطلب
  totalPrice: { type: Number, required: true },

  // 💸 مجموع الخصومات في الطلب (اختياري)
  discountTotal: { type: Number, default: 0 },

  // 🕒 تاريخ الإنشاء
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
});

// 🧠 إنشاء النموذج وتصديره
module.exports = mongoose.model('Order', orderSchema);
