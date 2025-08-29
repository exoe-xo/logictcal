// // models/Discount.js
// const mongoose = require('mongoose');

// const discountSchema = new mongoose.Schema({
//   discountRate: Number,
//   discountAmount: Number,
//   discountReason: String,
//   appliedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Discount', discountSchema);



// const mongoose = require('mongoose');

// const discountSchema = new mongoose.Schema({
//   _id: { type: String, default: 'global-discount' },
//   discountRate: { type: Number, default: 0 }, // نسبة مئوية
//   discountAmount: { type: Number, default: 0 }, // مبلغ ثابت
//   discountReason: { type: String, default: '' },
//   appliedAt: { type: Date, default: null }
// });

// module.exports = mongoose.model('Discount', discountSchema);



const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  discountRate: { type: Number, default: 0 }, // نسبة مئوية (اختياري)
  discountAmount: { type: Number, required: true }, // مبلغ الخصم
  discountReason: { type: String, required: true }, // سبب الخصم
  appliedAt: { type: Date, default: Date.now } // تاريخ التطبيق
}, { timestamps: true }); // يضيف createdAt و updatedAt تلقائيًا

module.exports = mongoose.model('Discount', discountSchema);
