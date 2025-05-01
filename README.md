# My Attendance API | نظام إدارة الحضور والانصراف

My Attendance API هو نظام لإدارة الحضور والانصراف مصمم لتسهيل تسجيل وتتبع الحضور للطلاب بطريقة منظمة وآمنة باستخدام RESTful API.

---

## Key Features | الميزات الرئيسية

### Attendance Management | إدارة الحضور:
- تسجيل الدخول (Check-In) وتسجيل الانصراف (Check-Out).
- التحقق من سجل الحضور اليومي لتجنب التكرار.

### User Management | إدارة المستخدمين:
- إنشاء حسابات مستخدمين جديدة بأمان.
- تسجيل الدخول باستخدام المصادقة عبر JSON Web Tokens (JWT).

### Data Security | تأمين البيانات:
- تشفير كلمات المرور باستخدام مكتبة bcryptjs.
- فصل الحقول الحساسة مثل كلمة المرور عند استرجاع بيانات المستخدمين.

### Flexibility and Scalability | مرونة وتوسعة:
- بنية منظمة تعتمد على Express.js وMongoose.
- دعم سياسات CORS للتكامل مع التطبيقات الأمامية.

---

## Project Structure | الهيكلية

```
my-attendance-api/
├── routers/
│   ├── checkIn.js
│   ├── checkOut.js
│   ├── createUser.js
│   ├── login.js
│   ├── existingRecord.js
│   ├── users.js
├── schema/
│   ├── regstur.js
│   ├── state.js
├── db.js
├── index.js
├── package.json
```

---

## Requirements | المتطلبات

- Node.js (الإصدار 16.0 أو أحدث | v16.0 or later)
- MongoDB (لإدارة قاعدة البيانات | for database management)

---

## Installation and Usage | التثبيت والاستخدام

### 1. Clone the Project | نسخ المشروع:
```bash
git clone https://github.com/RAMADAN-MAHDY/my-attendance-api.git
cd my-attendance-api
```

### 2. Install Dependencies | تثبيت الحزم:
```bash
npm install
```

### 3. Configure Environment Variables | إعداد المتغيرات البيئية:
- قم بإنشاء ملف `.env` وأضف المفاتيح التالية:
  ```
  ACCESS_TOKEN_SECRET=your_access_secret
  REFRESH_TOKEN_SECRET=your_refresh_secret
  MONGO_URI=your_mongo_connection
  ```

### 4. Run the Application | تشغيل التطبيق:
```bash
npm run dev
```

---

## Usage | الاستخدام

### Attendance Management | إدارة الحضور

#### Check-In | تسجيل الدخول:
- Endpoint | نقطة النهاية: `POST /api/checkin`
- Required Data | البيانات المطلوبة:
  ```json
  {
    "id": "user_id"
  }
  ```

#### Check-Out | تسجيل الانصراف:
- Endpoint | نقطة النهاية: `PUT /api/checkout`
- Required Data | البيانات المطلوبة:
  ```json
  {
    "id": "user_id"
  }
  ```

### User Management | إدارة المستخدمين

#### Create a New User | إنشاء مستخدم جديد:
- Endpoint | نقطة النهاية: `POST /api/createUser`
- Required Data | البيانات المطلوبة:
  ```json
  {
    "names": "user_name",
    "password": "user_password",
    "code": "user_code",
    "phone": "user_phone",
    "grade": "user_grade",
    "classRoom": "user_classRoom"
  }
  ```

#### Login | تسجيل الدخول:
- Endpoint | نقطة النهاية: `POST /api/login`
- Required Data | البيانات المطلوبة:
  ```json
  {
    "code": "user_code",
    "password": "user_password"
  }
  ```

---

## Packages Used | الحزم المستخدمة

- **express:** لإنشاء واجهات RESTful API | For building RESTful APIs.
- **mongoose:** للتعامل مع MongoDB | For MongoDB interactions.
- **bcryptjs:** لتشفير كلمات المرور | For password encryption.
- **jsonwebtoken:** لإدارة المصادقة باستخدام JWT | For managing authentication with JWT.
- **dotenv:** لإدارة المتغيرات البيئية | For managing environment variables.
- **moment:** لمعالجة التواريخ | For date manipulation.

---
````




