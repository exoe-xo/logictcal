// //📁 server/models/Product.js

// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   productName: String,
//   costPrice: Number,
//   salePrice: Number,
//   quantity: Number,
//   profitMargin: String,
//   profitAmount: String,
//   imagePath: {
//     type: String,
//     required: false // الصورة اختيارية
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Product', productSchema);


/*------------------------------------------------------*/



// // 📁 server/models/Product.js

// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   productName: { type: String, required: true, trim: true },
//   costPrice: { type: Number, required: true, min: 0 },
//   salePrice: { type: Number, required: true, min: 0 },
//   quantity: { type: Number, required: true, min: 0 },
//   profitMargin: { type: String, default: "0.00" },
//   profitAmount: { type: String, default: "0.00" },
//   imagePath: { type: String },
//   createdAt: { type: Date, default: Date.now }
// }, {
//   versionKey: false
// });

// module.exports = mongoose.model('Product', productSchema);






// 📦 استيراد مكتبة mongoose لإنشاء النموذج
const mongoose = require('mongoose');

// 🧬 تعريف هيكل المنتج داخل قاعدة البيانات
const productSchema = new mongoose.Schema({
  // 🏷️ اسم المنتج
  productName: {
    type: String,
    required: true,
    trim: true
  },

  // 💸 سعر التكلفة
  costPrice: {
    type: Number,
    required: true,
    min: 0
  },

  // 💰 سعر البيع
  salePrice: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value) {
        return value >= this.costPrice;
      },
      message: '💰 سعر البيع يجب أن يكون أكبر أو مساوي لسعر التكلفة'
    }
  },

  // 📦 الكمية المتوفرة
  quantity: {
    type: Number,
    required: true,
    min: 0
  },

  // 📈 هامش الربح كنسبة مئوية
  profitMargin: {
    type: Number,
    default: 0
  },

  // 💵 هامش الربح بالقيمة
  profitAmount: {
    type: Number,
    default: 0
  },

  // 🖼️ مسار الصورة داخل مجلد uploads
  imagePath: {
    type: String
  },

  // ⚠️ حالة التخزين المنخفض (يتم حسابها تلقائيًا)
  isLowStock: {
    type: Boolean,
    default: function () {
      return this.quantity <= 5;
    }
  },

  // 🕒 تاريخ الإنشاء
  createdAt: {
    type: Date,
    default: Date.now
  },

  // 🕒 تاريخ آخر تعديل
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false // 🚫 إلغاء استخدام __v من MongoDB
});

// 🔄 تحديث تاريخ التعديل تلقائيًا قبل أي تعديل
productSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  console.log('🛠️ تحديث المنتج - تحديث تاريخ التعديل');
  next();
});

// 🧾 طباعة المنتج عند الحفظ (اختياري للمراقبة)
productSchema.post('save', function (doc) {
  console.log(`✅ تم حفظ المنتج: ${doc.productName} | ID: ${doc._id}`);
});

// 📤 تصدير النموذج لاستخدامه في المسارات
module.exports = mongoose.model('Product', productSchema);
