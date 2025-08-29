// 📁 server/config.js
const dotenv = require('dotenv');
const path = require('path');

// تحميل ملف البيئة من نفس مجلد server
dotenv.config({ path: path.resolve(__dirname, './.env') });

module.exports = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
};
