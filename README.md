# My Attendance API

My Attendance API هو تطبيق تتبع الحضور مصمم لإدارة تسجيل الحضور والانصراف للمستخدمين باستخدام RESTful API. يهدف المشروع إلى تسهيل عملية تسجيل وإدارة الحضور بطريقة آمنة ومنظمة.

---

## الميزات الرئيسية

- **إدارة الحضور:**
  - تسجيل الدخول (Check-In) وتسجيل الانصراف (Check-Out).
  - التحقق من سجل الحضور اليومي لتجنب التكرار.
- **إدارة المستخدمين:**
  - إنشاء حسابات مستخدمين جديدة بأمان.
  - تسجيل الدخول باستخدام المصادقة عبر JSON Web Tokens (JWT).
- **تصدير البيانات:**
  - تصدير سجلات الحضور إلى ملفات Excel.
- **تأمين البيانات:**
  - تشفير كلمات المرور باستخدام مكتبة bcryptjs.
  - فصل حقول حساسة مثل كلمة المرور عند استرجاع بيانات المستخدمين.
- **مرونة وتوسعة:**
  - بنية منظمة تعتمد على Express.js وMongoose.
  - دعم سياسات CORS للتكامل مع التطبيقات الأمامية.

---

## الهيكلية

my-attendance-api/ ├── routers/ │ ├── checkIn.js │ ├── checkOut.js │ ├── createUser.js │ ├── login.js │ ├── existingRecord.js │ ├── users.js ├── schema/ │ ├── regstur.js │ ├── state.js ├── db.js ├── index.js ├── package.json


---

## المتطلبات

- Node.js (الإصدار 16.0 أو أحدث)
- MongoDB (لإدارة قاعدة البيانات)

---

## التثبيت والاستخدام
git clone https://github.com/RAMADAN-MAHDY/my-attendance-api.git cd my-attendance-api

1. **نسخ المشروع:**

2. **تثبيت الحزم:**
npm install



3. **إعداد المتغيرات البيئية:**
- قم بإنشاء ملف `.env` وإضافة المفاتيح التالية:
  ```
  ACCESS_TOKEN_SECRET=your_access_secret
  REFRESH_TOKEN_SECRET=your_refresh_secret
  MONGO_URI=your_mongo_connection
  ```

4. **تشغيل التطبيق:**
npm run dev


---

## الاستخدام

### تسجيل الحضور

- **Check-In:**
- نقطة النهاية: `POST /api/checkin`
- البيانات المطلوبة:
 ```json
 {
   "id": "user_id"
 }
 ```

- **Check-Out:**
- نقطة النهاية: `PUT /api/checkout`
- البيانات المطلوبة:
 ```json
 {
   "id": "user_id"
 }
 ```

### إدارة المستخدمين

- **إنشاء مستخدم جديد:**
- نقطة النهاية: `POST /api/createUser`
- البيانات المطلوبة:
 ```json
 {
   "names": "user_name",
   "password": "user_password",
   "code": "user_code"
 }
 ```

- **تسجيل الدخول:**
- نقطة النهاية: `POST /api/login`
- البيانات المطلوبة:
 ```json
 {
   "code": "user_code",
   "password": "user_password"
 }
 ```

---

## الحزم المستخدمة

- **express:** لإنشاء واجهات RESTful API.
- **mongoose:** للتعامل مع MongoDB.
- **bcryptjs:** لتشفير كلمات المرور.
- **jsonwebtoken:** لإدارة المصادقة باستخدام JWT.
- **exceljs:** لتصدير البيانات إلى ملفات Excel.
- **dotenv:** لإدارة المتغيرات البيئية.
- **moment:** لمعالجة التواريخ.

---




