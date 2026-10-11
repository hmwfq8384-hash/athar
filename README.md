# أَثَر | ATHAR

> انشر خيرًا، واترك أثرًا، وتنافس في القرآن

منصة اجتماعية إسلامية عربية (RTL) مبنية بـ React + TypeScript + Vite + Tailwind + Firebase.
المشروع يُسلَّم على مراحل؛ هذا الملف يوثّق **المرحلة 1** ويُحدَّث مع كل مرحلة.

## حالة المراحل

| المرحلة | المحتوى | الحالة |
|---|---|---|
| 1 | البنية، التصميم، الثيمات الثلاثة، i18n، PWA، المصادقة، الملف الشخصي، الإعدادات، قواعد Firestore/Storage، دالة حذف الحساب | مكتوبة — **لم تُشغَّل بعد** (انظر الملاحظة) |
| 2 | المنشورات، الصور، التفاعلات، التعليقات، المتابعة، البحث | قادمة |
| 3 | سباق الحُفّاظ، محرك الحساب والترتيب، التصحيح، رحلتي مع القرآن | قادمة |
| 4 | الأهداف، المراجعة، رفيق القرآن، التسميع الصوتي | قادمة |
| 5 | العبادات، الأذكار، صدقة العلم، الإشعارات | قادمة |
| 6 | لوحة الإدارة، الأمان المتقدم، الاختبارات الشاملة، الأداء، النشر | قادمة |

> **ملاحظة صريحة:** كُتب كود المرحلة 1 في بيئة لا تسمح بالوصول إلى سجل npm، فلم يُنفَّذ
> `npm install` ولا `npm run build` ولا الاختبارات هناك. شغّلها عندك أولًا، وأي خطأ يظهر
> أرسله لنصلحه قبل الانتقال للمرحلة التالية.

## المتطلبات

- Node.js 20 أو أحدث، و npm
- حساب Firebase (خطة Blaze مطلوبة لنشر Cloud Functions)
- Firebase CLI: `npm i -g firebase-tools`

## التشغيل المحلي

```bash
npm install
cp .env.example .env.local     # ثم املأ قيم Firebase
npm run dev
```

```bash
npm run build       # فحص الأنواع + بناء الإنتاج
npm run test        # اختبارات الوحدات (Vitest)
npm run test:rules  # اختبارات قواعد Firestore/Storage داخل المحاكي (تحتاج Firebase CLI وJava)
```

## ربط Firebase

1. أنشئ مشروعًا في [Firebase Console](https://console.firebase.google.com).
2. **Authentication** ← Sign-in method ← فعّل «Email/Password» (و«Google» اختياريًا ثم اضبط `VITE_ENABLE_GOOGLE_AUTH=true`).
3. **Firestore Database** ← أنشئ قاعدة بيانات (Production mode).
4. **Storage** ← فعّله.
5. **Project settings ← Your apps ← Web app** ← انسخ الإعدادات إلى `.env.local`.
6. انسخ `.firebaserc.example` إلى `.firebaserc` وضع معرّف مشروعك.
7. (موصى به للإنتاج) **App Check**: سجّل التطبيق بمزوّد reCAPTCHA v3 وضع المفتاح في `VITE_RECAPTCHA_SITE_KEY`، ثم فعّل الإنفاذ (Enforce) لـ Firestore وStorage بعد التأكد أن التطبيق يعمل.

### نشر القواعد والدوال

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
cd functions && npm install && cd ..
firebase deploy --only functions
```

## النشر على Netlify

1. اربط المستودع بـ Netlify. الإعدادات في `netlify.toml` (أمر البناء `npm run build`، المجلد `dist`، وإعادة التوجيه لصفحة SPA).
2. أضف متغيرات `VITE_*` نفسها في Site settings ← Environment variables.
3. أضف نطاق Netlify إلى Authentication ← Settings ← Authorized domains.

## معمارية المشروع

```
src/
  components/      واجهات مشتركة (ui/) والتخطيط (layout/)
  features/        auth، profile، settings: خدمات + مكونات لكل ميزة
  pages/           صفحات الموجّه (تُحمَّل كسولًا)
  store/           zustand: التفضيلات المحفوظة (ثيم، خط، حركة، لغة) والتنبيهات
  i18n/            ar.json (المرجع) و en.json (تُعرض الإنجليزية فقط عند اكتمالها)
  lib/             firebase، env، أخطاء عربية، ضغط الصور
functions/         Cloud Functions (deleteAccount)
rules-tests/       اختبارات القواعد على المحاكي
```

## قرارات أمان في المرحلة 1

- **اسم المستخدم فريد**: يُحجز في `usernames/{name}` ضمن دفعة واحدة مع إنشاء `users/{uid}`؛ القواعد تتحقق من الاثنتين معًا (`getAfter/existsAfter`) فلا يمكن حجز الاسم دون ملف ولا إنشاء ملف دون حجز.
- **العدادات** (المنشورات، التفاعلات المستلمة، المتابعون) لا يكتبها العميل؛ تُنشأ بصفر ولا تتغير إلا من الخادم في المراحل القادمة.
- **صلاحيات الإدارة** ستكون Custom Claims فقط؛ القواعد لا تثق بأي حقل في وثائق المستخدم.
- **حذف الحساب**: إعادة مصادقة على العميل، ثم دالة خادمية تتحقق أن آخر دخول خلال 5 دقائق وتحذف الوثائق والملفات واسم المستخدم وحساب Auth.
- الصور الشخصية: JPG/PNG/WebP فقط، تُضغط وتُحوَّل إلى JPEG (يُزال EXIF) والحد 2MB في القواعد.
- النصوص تُعرض كنص عادي عبر React (لا `dangerouslySetInnerHTML`).

## ما لم يُنفَّذ بعد (عن قصد)

عناصر التنقل السفلي تعرض الأقسام المنجزة فقط (الرئيسية، حسابي) حتى لا توجد أزرار بلا وجهة؛
تُضاف «سباق الحفاظ» و«إضافة منشور» و«عباداتي» في مراحلها. الصفحة الرئيسية حاليًا حالة فارغة حقيقية
تُستبدل بتغذية المنشورات في المرحلة 2. لا توجد ميزة حلقات القرآن أو مجموعات الحفظ في أي مرحلة.
