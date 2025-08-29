
// 📁 server/server.js
// 🔌 نقطة تشغيل السيرفر واتصال MongoDB

// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const path = require('path');
// const app = require('./app');

// // 🧪 تحميل متغيرات البيئة من ملف .env داخل مجلد server
// dotenv.config({ path: path.resolve(__dirname, './.env') });

// // 🧠 طباعة المتغيرات البيئية للتأكد من تحميلها
// console.log('\n🔍 المتغيرات البيئية المحملة:');
// console.log(`   🔸 MONGO_URI: ${process.env.MONGO_URI || '❌ غير معرف'}`);
// console.log(`   🔸 PORT: ${process.env.PORT || '❌ غير معرف'}`);

// // ✅ التحقق من وجود MONGO_URI قبل محاولة الاتصال
// if (!process.env.MONGO_URI) {
//   console.error('\n🚫 خطأ: لم يتم العثور على MONGO_URI في ملف .env');
//   process.exit(1); // 🛑 إيقاف التشغيل لتجنب أخطاء لاحقة
// }

// // 🔗 الاتصال بقاعدة البيانات MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('✅ تم الاتصال بقاعدة البيانات MongoDB بنجاح');
// })
// .catch((err) => {
//   console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
//   process.exit(1); // 🛑 إيقاف التشغيل عند فشل الاتصال
// });

// // 🚀 تشغيل السيرفر على المنفذ المحدد
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`\n🚀 Logistical server يعمل على: http://localhost:${PORT}`);
//   console.log('📡 جاهز لاستقبال الطلبات من الواجهة الأمامية\n');
// });




// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const path = require('path');
// const fs = require('fs');
// const app = require('./app');


// // 🧪 تحميل متغيرات البيئة
// const envPath = path.resolve(__dirname, './.env');
// dotenv.config({ path: envPath });

// if (!fs.existsSync(envPath)) {
//   console.warn('⚠️ ملف .env غير موجود في المسار المتوقع');
// }




// // 🧠 طباعة المتغيرات البيئية
// console.log('\n🔍 المتغيرات البيئية المحملة:');
// console.log(`   🔸 MONGO_URI: ${process.env.MONGO_URI || '❌ غير معرف'}`);
// console.log(`   🔸 PORT: ${process.env.PORT || '❌ غير معرف'}`);

// // ✅ التحقق من MONGO_URI
// if (!process.env.MONGO_URI) {
//   console.error('\n🚫 خطأ: لم يتم العثور على MONGO_URI في ملف .env');
//   process.exit(1);
// }

// // 🔗 الاتصال بقاعدة البيانات
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('✅ تم الاتصال بقاعدة البيانات MongoDB بنجاح');
// })
// .catch((err) => {
//   console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
//   process.exit(1);
// });



// // 🕒 وقت التشغيل
// const now = new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' });
// console.log(`🕒 وقت التشغيل: ${now}`);

// // 🚀 تشغيل السيرفر
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`\n🚀 Logistical server يعمل على: http://localhost:${PORT}`);
//   console.log('📡 جاهز لاستقبال الطلبات من الواجهة الأمامية\n');
// });


// 📦 تحميل المتطلبات الأساسية
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const app = require('./app'); // 🧠 استيراد التطبيق الرئيسي الذي يحتوي على المسارات

// 🧪 تحديد مسار ملف البيئة .env وتحميله
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

// 🔗 محاولة الاتصال بقاعدة بيانات MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
mongoose.connect(MONGO_URI);


.then(() => {
  console.log('✅ تم الاتصال بقاعدة البيانات MongoDB بنجاح');
})
.catch((err) => {
  console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
  process.exit(1); // ❌ إيقاف التشغيل إذا فشل الاتصال
});

// 🕒 طباعة وقت التشغيل الحالي حسب توقيت الجزائر
const now = new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' });
console.log(`🕒 وقت التشغيل: ${now}`);

// 🚀 تشغيل السيرفر على البورت المحدد
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Logistical server يعمل على: http://localhost:${PORT}`);
  console.log('📡 جاهز لاستقبال الطلبات من الواجهة الأمامية');
});

