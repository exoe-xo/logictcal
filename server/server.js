
// 📦 تحميل المتطلبات الأساسية
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const path = require('path');
// const fs = require('fs');
// const app = require('./app'); // 🧠 استيراد التطبيق الرئيسي الذي يحتوي على المسارات
// const MONGO_URI = process.env.MONGO_URI;


// // 🧪 تحديد مسار ملف البيئة .env وتحميله
// const envPath = path.resolve(__dirname, './.env');
// dotenv.config({ path: envPath });

// // 🔍 التحقق من وجود ملف .env فعليًا
// if (!fs.existsSync(envPath)) {
//   console.warn('⚠️ ملف .env غير موجود في المسار المتوقع:', envPath);
// } else {
//   console.log('✅ تم تحميل ملف البيئة بنجاح:', envPath);
// }

// // 🧠 طباعة المتغيرات البيئية المحملة
// console.log('\n🔍 المتغيرات البيئية المحملة:');
// console.log(`   🔸 MONGO_URI: ${process.env.MONGO_URI || '❌ غير معرف'}`);
// console.log(`   🔸 PORT: ${process.env.PORT || '❌ غير معرف'}`);

// // ✅ التحقق من وجود MONGO_URI قبل محاولة الاتصال
// if (!process.env.MONGO_URI) {
//   console.error('\n🚫 خطأ: لم يتم العثور على MONGO_URI في ملف .env');
//   process.exit(1); // ❌ إيقاف التشغيل إذا لم يتم تعريف الاتصال
// }

// // 🔗 محاولة الاتصال بقاعدة بيانات MongoDB
// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// mongoose.connect(MONGO_URI);


// .then(() => {
//   console.log('✅ تم الاتصال بقاعدة البيانات MongoDB بنجاح');
// })
// .catch((err) => {
//   console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
//   process.exit(1); // ❌ إيقاف التشغيل إذا فشل الاتصال
// });


// try {
//   await mongoose.connect(DB_URI, options);
//   console.log('✅ تم الاتصال بقاعدة البيانات');
// } catch (err) {
//   console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
//   process.exit(1);
// }

// mongoose.connect(DB_URI, options)
//   .then(() => {
//     console.log('✅ تم الاتصال بقاعدة البيانات');
//   })
//   .catch((err) => {
//     console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
//     process.exit(1);
//   });



// 📦 تحميل المتطلبات الأساسية
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const app = require('./app'); // 🧠 استيراد التطبيق الرئيسي الذي يحتوي على المسارات

// 🧪 تحميل ملف البيئة .env من المسار المحدد
const envPath = path.resolve(__dirname, './.env');
dotenv.config({ path: envPath });

// 🔍 التحقق من وجود ملف .env فعليًا
if (!fs.existsSync(envPath)) {
  console.warn('⚠️ ملف .env غير موجود في المسار المتوقع:', envPath);
} else {
  console.log('✅ تم تحميل ملف البيئة بنجاح:', envPath);
}

// 🧠 طباعة المتغيرات البيئية المحملة
console.log('\n🔍 المتغيرات البيئية المحملة:');
console.log(`   🔸 MONGO_URI: ${process.env.MONGO_URI || '❌ غير معرف'}`);
console.log(`   🔸 PORT: ${process.env.PORT || '❌ غير معرف'}`);

// ✅ التحقق من وجود MONGO_URI قبل محاولة الاتصال
if (!process.env.MONGO_URI) {
  console.error('\n🚫 خطأ: لم يتم العثور على MONGO_URI في ملف .env');
  process.exit(1); // ❌ إيقاف التشغيل إذا لم يتم تعريف الاتصال
}

// 🔗 الاتصال بقاعدة بيانات MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ تم الاتصال بقاعدة البيانات MongoDB بنجاح');
})
.catch((err) => {
  console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
  process.exit(1);
});

// 🕒 طباعة وقت التشغيل الحالي حسب توقيت الجزائر
const now = new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' });
console.log(`\n🕒 وقت التشغيل: ${now}`);

// 🚀 تشغيل السيرفر على البورت المحدد
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Logistical server يعمل على: http://localhost:${PORT}`);
  console.log('📡 جاهز لاستقبال الطلبات من الواجهة الأمامية');
});


