// Action URLs requested by the user
export const APP_STORE_URL = "https://apps.apple.com/app/tarx-fitness-ai";
export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.tarx.app";
export const BAZAAR_URL = "https://cafebazaar.ir/app/com.tarx.app";
export const MYKET_URL = "https://myket.ir/app/com.tarx.app";

export interface LinkType {
  text: string;
  href: string;
}

export interface TranslationSchema {
  dir: "rtl" | "ltr";
  lang: "fa" | "en";
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  navbar: {
    home: string;
    features: string;
    about: string;
    privacy: string;
    terms: string;
    cta: string;
    languageToggle: string;
    otherLang: "fa" | "en";
  };
  hero: {
    badge: string;
    titleFirst: string;
    titleAccent: string;
    titleLast: string;
    subtitle: string;
    trustBullet1: string;
    trustBullet2: string;
    trustBullet3: string;
    trustBullet4: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    item1Title: string;
    item1Desc: string;
    item1Badge: string;
    item2Title: string;
    item2Desc: string;
    item2Badge: string;
    item3Title: string;
    item3Desc: string;
    item3Badge: string;
    subBar1: string;
    subBar2: string;
    subBar3: string;
  };
  showcase: {
    row1Badge: string;
    row1Title: string;
    row1Desc: string;
    row1Bullet1Title: string;
    row1Bullet1Desc: string;
    row1Bullet2Title: string;
    row1Bullet2Desc: string;
    row2Badge: string;
    row2Title: string;
    row2Desc: string;
    row2Bullet1Title: string;
    row2Bullet1Desc: string;
    row2Bullet2Title: string;
    row2Bullet2Desc: string;
  };
  stats: {
    item1Val: string;
    item1Suf: string;
    item1Label: string;
    item1Desc: string;
    item2Val: string;
    item2Suf: string;
    item2Label: string;
    item2Desc: string;
    item3Val: string;
    item3Suf: string;
    item3Label: string;
    item3Desc: string;
    item4Val: string;
    item4Suf: string;
    item4Label: string;
    item4Desc: string;
  };
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
    sending: string;
    successTitle: string;
    successDesc: string;
    successPromoCode: string;
    successPromoVal: string;
    successQueue: string;
    successQueueVal: string;
    downloadsTitle: string;
    trialBadge: string;
  };
  aboutPage: {
    title: string;
    seoTitle: string;
    seoDesc: string;
    introTitle: string;
    introDesc1: string;
    introDesc2: string;
    visionTitle: string;
    visionDesc: string;
    featuresTitle: string;
    featuresList: string[];
    valuesTitle: string;
    values: Array<{ title: string; desc: string }>;
  };
  privacyPage: {
    title: string;
    seoTitle: string;
    seoDesc: string;
    lastUpdated: string;
    tocTitle: string;
    sections: Array<{ id: string; title: string; content: string[] }>;
  };
  termsPage: {
    title: string;
    seoTitle: string;
    seoDesc: string;
    lastUpdated: string;
    tocTitle: string;
    sections: Array<{ id: string; title: string; content: string[] }>;
  };
  footer: {
    description: string;
    storeDownloadTitle: string;
    copyright: string;
    craftedWith: string;
  };
}

export const translations: Record<"fa" | "en", TranslationSchema> = {
  fa: {
    dir: "rtl",
    lang: "fa",
    meta: {
      title: "Tarx | اپلیکیشن تمرین بدنسازی و مربی هوشمند فیتنس با هوش مصنوعی",
      description: "با اپلیکیشن فیتنس فارسی Tarx، برنامه تمرینی اختصاصی دریافت کنید. مجهز به مربی هوشمند بدنسازی و ابزار پیشرفته تحلیل پیشرفت ورزشی برای تناسب اندام پایدار.",
      keywords: "اپلیکیشن تمرین بدنسازی, برنامه تمرینی اختصاصی, مربی هوشمند بدنسازی, تحلیل پیشرفت ورزشی, اپ فیتنس فارسی, ورزش در خانه, هوش مصنوعی ورزشی, Tarx"
    },
    navbar: {
      home: "خانه",
      features: "ویژگی‌ها",
      about: "درباره ما",
      privacy: "حریم خصوصی",
      terms: "شرایط استفاده",
      cta: "شروع کنید",
      languageToggle: "English",
      otherLang: "en"
    },
    hero: {
      badge: "نسل جدید اپلیکیشن فیتنس فارسی با هوش مصنوعی",
      titleFirst: "برنامه تمرینی اختصاصی،",
      titleAccent: "مربی هوشمند",
      titleLast: "و تحلیل پیشرفت در یک اپ",
      subtitle: "با اپلیکیشن فیتنس فارسی Tarx تمرین‌هایت را دقیق‌تر انجام بده، پیشرفتت را با نمودارهای علمی بسنج و به کمک مربی هوشمند، بهترین برنامه‌ ورزشی متناسب با تیپ بدنی و اهداف تناسب اندام خود را به دست آور.",
      trustBullet1: "تحلیل آنی تکنیک انجام حرکت",
      trustBullet2: "نمودار اتوماتیک تناژ وزنه‌ها",
      trustBullet3: "برنامه‌های شخصی‌سازی شده",
      trustBullet4: "مشاوره تغذیه هوشمند ۲۴ ساعته",
      ctaPrimary: "شروع تمرین هوشمند",
      ctaSecondary: "مشاهده امکانات"
    },
    features: {
      badge: "پیشرفته‌ترین تکنولوژی مربیگری",
      title: "تمرین هوشمند، پیشرفت واقعی",
      subtitle: "ترکیب مربی برتر فیتنس با الگوریتم‌های پردازش تصویر و داده کاوی ورزشی برای به حداکثر رساندن نتایج عضلانی شما.",
      item1Title: "برنامه تمرینی شخصی‌سازی‌شده",
      item1Desc: "برنامه ورزشی کاملاً متناسب با تیپ بدنی، سطح انرژی روزانه، رکورد وزنه زدن‌ها، و میزان چربی یا عضله هدف شما توسط هوش مصنوعی اختصاصی Tarx تدوین می‌شود.",
      item1Badge: "سازگار هوشمند",
      item2Title: "تحلیل فرم و اجرای حرکت",
      item2Desc: "به کمک تشخیص موقعیت مفاصل در حین فیلمبرداری زنده با گوشی، هوش مصنوعی زوایای تمرین را مانیتور کرده و از آسیب به ستون فقرات و اجرای اشتباه حرکت کاملا پیشگیری می‌کند.",
      item2Badge: "تشخیص زنده مفاصل",
      item3Title: "گزارش پیشرفت و نمودارهای دقیق",
      item3Desc: "با مانیتور خودکار میزان وزنه‌زدن‌ها، کالری و مدت استراحت، پلتفرم نمودارهایی شبیه به داشبوردهای مهندسی تولید می‌کند تا از رشد قدرت بدنی‌تان به شکل لحظه‌ای مطمئن شوید.",
      item3Badge: "گزارش مهندسی ورزشی",
      subBar1: "پشتیبانی کامل از اهداف حجم، کات و تناسب اندام عمومی",
      subBar2: "بدون نیاز به سنسور خارجی - عملکرد ۱۰۰٪ با دوربین گوشی",
      subBar3: "آپدیت مستمر الگوریتم‌های مربی بدنسازی هوش مصنوعی"
    },
    showcase: {
      row1Badge: "پیشرفته‌ترین نمودار قدرت ورزشی",
      row1Title: "پیشرفتت رو با نمودارهای دقیق ببین",
      row1Desc: "با مربی هوشمند Tarx، دیگر نیازی به نوشتن اطلاعات در دفترچه یادداشت آفلاین نیست. اپلیکیشن به صورت اتوماتیک تناژ وزنه‌های لیفت شده، تکرارها، کالری‌های سوخته شده در هر ثانیه و کل فرکانس تمرینات عضلانی‌تان را در یک چارت ۳ بعدی آنالیز می‌کند.",
      row1Bullet1Title: "تحلیل دقیق رشد وزنه‌ها",
      row1Bullet1Desc: "مشاهده روند یک ماهه بار اضافه شونده عضلات.",
      row1Bullet2Title: "پیگیری پیوستگی روزانه",
      row1Bullet2Desc: "دارای هیت‌مپ روزهای فعال ورزشی در تقویم رسمی.",
      row2Badge: "مربیگری گام‌به‌گام و مصور",
      row2Title: "تمرین رو قدم‌به‌قدم انجام بده",
      row2Desc: "روال تمرینی شلوغ و با استرس انتخاب حرکت را با Tarx فراموش کنید. هر ست تمرینی با همراهی فیلم‌های باکیفیت آموزشی، تایمر دقیق زمان استراحت بین ست‌ها، ضربان قلب شما، و تعداد تکرارهای باقی‌مانده هدایت می‌شود.",
      row2Bullet1Title: "تایمر هوشمند استراحت",
      row2Bullet1Desc: "محاسبه علمی مدت زمان بازسازی نفس و انرژی.",
      row2Bullet2Title: "آموزش تصویری زاویه اجرای حرکت",
      row2Bullet2Desc: "دارای راهنمای تعاملی ۳ بعدی عضلات هدف."
    },
    stats: {
      item1Val: "+۱۲۰",
      item1Suf: "حرکت",
      item1Label: "تمرین جامع آموزشی",
      item1Desc: "حرکات مصور با مانیتور فرم مفاصل",
      item2Val: "+۳۰",
      item2Suf: "برنامه",
      item2Label: "برنامه‌ آماده تناسب اندام",
      item2Desc: "تدوین شده توسط مربیان سطح جهانی",
      item3Val: "۲۴/۷",
      item3Suf: "مربی",
      item3Label: "مربی هوشمند بدنسازی همراه",
      item3Desc: "مشاوره فنی و تغذیه‌ای زنده در ثانیه",
      item4Val: "۱۰۰٪",
      item4Suf: "شخصی",
      item4Label: "شخصی‌سازی شده",
      item4Desc: "انطباق آنی با سطح چربی و قدرت شما"
    },
    cta: {
      badge: "دسترسی زودهنگام به نسخه VIP بتا",
      title: "آماده‌ای نسخه قوی‌تر خودت رو بسازی؟",
      subtitle: "از امروز تمرینت رو هوشمندتر شروع کن. با وارد کردن ایمیلت جزء اولین کاربران ایرانی باش که از قدرت مربی بدنسازی هوش مصنوعی Tarx بهره‌مند می‌شوند.",
      placeholder: "آدرس ایمیل خود را وارد کنید...",
      button: "شروع رایگان",
      sending: "در حال ثبت...",
      successTitle: "ایمیل شما با موفقیت ثبت شد!",
      successDesc: "به باشگاه کاربران طلایی Tarx خوش آمدید. کد دعوت اختصاصی و دستورالعمل نصب نسخه آزمایشی بتا به آدرس ایمیل شما ارسال خواهد شد.",
      successPromoCode: "کد هدیه مخصوص",
      successPromoVal: "TARX_BETA",
      successQueue: "رتبه نوبت شما",
      successQueueVal: "#۱۰۲۴",
      downloadsTitle: "در دسترس برای پلتفرم‌های پرطرفدار مارکت:",
      trialBadge: "شامل دوره تست رایگان ۱۴ روزه بدون نیاز به کارت بانکی"
    },
    aboutPage: {
      title: "درباره Tarx",
      seoTitle: "درباره ما | مربی هوشمند و دستیار دقیق فیتنس Tarx",
      seoDesc: "پلتفرم ورزشی هوش مصنوعی Tarx چطور به شما کمک می‌کند برنامه‌های تمرینی کاملاً یونیک بر اساس آناتومی بدن خود دریافت کنید و با تکنولوژی زنده گام بردارید.",
      introTitle: "انقلاب دیجیتال در دنیای فیتنس و بدنسازی",
      introDesc1: "اپلیکیشن Tarx یک پلتفرم جامع و هوشمند برای ورزشکاران حرفه‌ای و علاقه‌مندان به فیتنس است که به کمک مدل‌های هوش مصنوعی اختصاصی، تجربه مربیگری زنده و دقیق را روی گوشی موبایل فراهم کرده است. ما معتقدیم مسیر بدنسازی برای هر فرد به اندازه ساختار ژنتیکی او منحصر به فرد است.",
      introDesc2: "با حذف روش‌های سنتی و برنامه‌های کاغذی بدون تغییر، Tarx با پایش تکنیک انجام تمرین، تناژ وزنه‌ها و زمان استراحت، مثل یک مربی با تجربه بین‌المللی در هر لحظه کنار شماست تا از آسیب دیدگی پیشگیری کرده و بازدهی عضلانی را به حداکثر برساند.",
      visionTitle: "چشم‌انداز و ماموریت ما",
      visionDesc: "تسهیل و علمی‌سازی تمرین برای تمامی افراد جامعه با هزینه بسیار اقتصادی. ما قصد داریم با فناوری هوش مصنوعی، مربیگری تراز اول جهانی را بدون نیاز به پرداخت هزینه‌های گزاف در دسترس همگان قرار دهیم.",
      featuresTitle: "ویژگی‌های اصلی پلتفرم مربیگری Tarx",
      featuresList: [
        "طراحی برنامه‌های تمرینی بلند مدت با هوش مصنوعی و بهینه‌سازی دائم",
        "موتور بینایی عمیق موبایل جهت بررسی آنی زاویه مفاصل و زانوها حین حرکات کلیدی",
        "داشبورد ثبت اتوماتیک تمام ست‌ها، وزنه‌ها، و رکوردهای ورزشی",
        "بانک حرکتی عظیم با بیش از ۱۲۰ حرکت و آموزش‌های سه بعدی مدرن",
        "بهینه‌سازی عادات خواب، تغذیه و هیدراتاسیون بدن"
      ],
      valuesTitle: "ارزش‌های کلیدی تیم Tarx",
      values: [
        { title: "دقت علمی و فیزیولوژیک", desc: "کلیه محاسبات بر مبنای آخرین دستاوردهای آکادمی‌های مطرح بدنسازی جهان انجام می‌شود." },
        { title: "امنیت داده‌های سلامتی", desc: "پرونده‌های ورزشی و اطلاعات فیزیکی شما با پیشرفته‌ترین لایه‌های رمزنگاری ذخیره می‌شود." },
        { title: "طراحی مدرن و رابط عالی", desc: "رابط کاربری چشم‌نواز تاریک و مینیمال برای افزایش تمرکز ذهنی در سالن‌های ورزشی." }
      ]
    },
    privacyPage: {
      title: "حریم خصوصی",
      seoTitle: "سیاست حفظ حریم خصوصی کاربران | Tarx App",
      seoDesc: "سیاست رسمی Tarx در قبال جمع‌آوری، امنیت، نحوه نگهداری و پردازش داده‌های فیزیکی، تحرکی و ورزشی کاربران در اپلیکیشن موبایل.",
      lastUpdated: "آخرین به‌روزرسانی: خرداد ۱۴۰۵",
      tocTitle: "فهرست بخش‌های سند",
      sections: [
        {
          id: "collect",
          title: "۱. داده‌هایی که جمع‌آوری می‌کنیم",
          content: [
            "اطلاعات حساب کاربری مانند ایمیل، سن، قد، وزن، جنسیت و اهداف تناسب اندام که به صورت اختیاری جهت بهینه‌سازی محاسبات ورزشی وارد می‌کنید.",
            "داده‌های فعالیت شامل لاگ وزنه زدن‌ها، حرکات انجام‌شده، زمان استراحت، ست‌ها و رکوردهای تمرین.",
            "داده‌های تصویری در صورتی که تصمیم بگیرید از دوربین اپلیکیشن جهت تحلیل هوشمند زاویه اجرای حرکات اسکوات و ددلیفت استفاده کنید. توجه کنید پردازش ویدیوها به صورت محلی در لایه مرورگر و دستگاه خودتان رخ می‌دهد و ویدیوها سمت سرور آپلود نمی‌شوند."
          ]
        },
        {
          id: "use",
          title: "۲. نحوه استفاده از داده‌ها",
          content: [
            "طراحی و سفارشی‌سازی اختصاصی برنامه‌های بدنسازی.",
            "محاسبه برآورد کالری سوزی دقیق عضلانی و حجم بار عضلانی عمیق.",
            "ارائه هشدارهای ایمنی هوشمند در صورت بالا بودن ضربان قلب یا انحراف شدید ستون فقرات حین تمرین.",
            "بهبود مداوم یادگیری ماشین مربی هوشمند جهت افزایش کیفیت تحلیل حرکات."
          ]
        },
        {
          id: "account",
          title: "۳. اطلاعات حساب و مدیریت پروفایل",
          content: [
            "شما در هر زمان می‌توانید در منوی تنظیمات اپلیکیشن Tarx، پروفایل کاربری خود را ویرایش کنید یا آن را به همراه تمام رکوردهای تمرین برای همیشه حذف نمایید."
          ]
        },
        {
          id: "analytics",
          title: "۴. تحلیل و داده‌های آماری",
          content: [
            "ما از ابزارهای بومی و ابزارهای ایمن استاندارد تحلیل آماری استفاده می‌کنیم تا به ارزیابی کارایی فنی ماژول‌ها و سرعت لود صفحات بپردازیم. این داده‌ها بدون ارتباط با مشخصات هویتی و به صورت کاملاً ناشناس پردازش می‌شوند."
          ]
        },
        {
          id: "security",
          title: "۵. امنیت داده‌ها",
          content: [
            "ما اقدامات امنیتی عالی فنی و سازمانی را جهت پیشگیری از هرگونه دسترسی غیرمجاز، مفقودی، تخریب یا سوء استفاده از سوابق سلامتی اندام شما به کار می‌بندیم.",
            "رمزنگاری SSL در تمامی مسیرهای انتقال داده برقرار است."
          ]
        },
        {
          id: "contact",
          title: "۶. تماس با ما",
          content: [
            "هرگونه سوال، ابهام یا درخواست در خصوص حریم خصوصی یا حذف پرونده‌های فیزیکی خود را می‌توانید از طریق آدرس ایمیل tvarxapp@gmail.com با کارشناسان ما مطرح فرمایید."
          ]
        }
      ]
    },
    termsPage: {
      title: "شرایط استفاده",
      seoTitle: "شرایط و قوانین استفاده از خدمات | Tarx App",
      seoDesc: "توافقنامه رسمی و تبرئه نامه‌های بهداشتی در خصوص استفاده از مربی هوشمند بدنسازی و پلن‌های تمرینی اپلیکیشن فیتنس Tarx.",
      lastUpdated: "آخرین به‌روزرسانی: خرداد ۱۴۰۵",
      tocTitle: "فهرست بخش‌های سند",
      sections: [
        {
          id: "accept",
          title: "۱. پذیرش شرایط",
          content: [
            "با نصب، راه‌اندازی و استفاده از اپلیکیشن فیتنس Tarx، شما به طور کامل موافقت خود را با مفاد این توافقنامه اعلام می‌کنید. چنانچه با هریک از این مفاد موافق نیستید، حق استفاده از این برنامه را ندارید."
          ]
        },
        {
          id: "disclaimer",
          title: "۲. رفع مسئولیت پزشکی و سلامتی (مهم)",
          content: [
            "خدمات اپلیکیشن Tarx هرگز نباید به عنوان جایگزین برای توصیه‌های پزشکی، فیزیوتراپی، یا درمان‌های کلینیکی در نظر گرفته شوند.",
            "تمرینات بدنسازی و کار با وزنه‌های سنگین ذاتا دارای ریسک آسیب بدنی هستند. شما پیش از شروع هرگونه برنامه ورزشی باید با پزشک معتمد خود مشورت کنید.",
            "ما هیچ‌گونه مسئولیتی در قبال صدمات فیزیکی، کشیدگی عضلات، دیسک کمر، یا هرگونه عیب سلامتی ثانویه ناشی از عدم تمرکز یا استفاده نادرست از پیشنهادات مربی هوشمند بر عهده نمی‌گیریم."
          ]
        },
        {
          id: "account",
          title: "۳. حساب کاربری و اشتراک‌ها",
          content: [
            "شما مسئول حفظ اطلاعات امنیتی رمز عبور حساب خود هستید. فعالیت‌های انجام‌شده تحت این حساب بر عهده خودتان است.",
            "برخی از قابلیت‌های مربی پیشرفته هوش مصنوعی به خرید پرداخت‌های درون‌برنامه‌ای دوره‌ای یا سالانه (در بازار، مایکت یا اپ‌استور) بستگی دارد. جزئیات بسته‌ها درون اپلیکیشن معین شده‌اند."
          ]
        },
        {
          id: "use",
          title: "۴. نحوه مجاز استفاده",
          content: [
            "استفاده از اپلیکیشن صرفآً برای مصارف شخصی و غیرتجاری مجاز است.",
            "هرگونه مهندسی معکوس، استخراج سورس کد، یا داده‌کاوی در بانک حرکتی و تصاویر آموزشی Tarx به لحاظ قانونی ممنوع بوده و مورد پیگرد قرار می‌گیرد."
          ]
        },
        {
          id: "limit",
          title: "۵. محدودیت مسئولیت بدنی",
          content: [
            "اپلیکیشن Tarx خدمات خود را به صورت 'همان‌گونه که هست' ارائه می‌دهد و هیچ تعهد یا گارانتی صد درصدی در قبال حاصل شدن قطعی نتایج مسابقاتی یا ساخت کوپ کوپ عضلات در یک مدت محدود ارائه نمی‌دهد."
          ]
        },
        {
          id: "contact",
          title: "۶. تماس با ما",
          content: [
            "جهت ارسال بازخورد، گزارش خطاهای فنی اپلیکیشن یا طرح سوالات حقوقی با آدرس ایمیل tvarxapp@gmail.com مکاتبه فرمایید."
          ]
        }
      ]
    },
    footer: {
      description: "پلتفرم ورزشی پیشرفته عضلانی Tarx با بهره‌گیری از مدل‌های پردازش تصویر هوشمند و الگوریتم‌های مربی بدنسازی، سبک زندگی و فیتنس شما را به اوج لذت و بهینگی می‌رساند.",
      storeDownloadTitle: "دریافت مستقیم و راه‌اندازی سریع اپلیکیشن موبایل",
      copyright: "تمامی حقوق مادی و معنوی اپلیکیشن متعلق به Tarx است.",
      craftedWith: "طراحی شده با عشق برای ورزشکاران خلاق دیروز و قهرمانان امروز"
    }
  },
  en: {
    dir: "ltr",
    lang: "en",
    meta: {
      title: "Tarx | AI Fitness Mobile App & Smart Workout Coach",
      description: "Receive personalized workout plans dynamically adjusted by Tarx AI. Equipped with an AI workout coach, instant posture analysis, and advanced tracking charts.",
      keywords: "AI fitness app, bodybuilding workout plans, AI personal trainer, performance analytics, Persian fitness app, home workouts, sports artificial intelligence, Tarx"
    },
    navbar: {
      home: "Home",
      features: "Features",
      about: "About",
      privacy: "Privacy",
      terms: "Terms",
      cta: "Get Started",
      languageToggle: "فارسی",
      otherLang: "fa"
    },
    hero: {
      badge: "The Next Generation of AI-Powered Fitness & Workout Apps",
      titleFirst: "Customized Workouts,",
      titleAccent: "Smart Coach,",
      titleLast: "and Seamless Analytics in One App",
      subtitle: "Perform your workouts precisely with Tarx. Track your progress with high-fidelity analytical charts, and get dynamic, tailored fitness programs perfect for your exact body type and goals.",
      trustBullet1: "Instant Form & Posture Analysis",
      trustBullet2: "Automatic Weight Volume Charts",
      trustBullet3: "Personalized Daily Routines",
      trustBullet4: "24/7 Smart Nutrition Advisory",
      ctaPrimary: "Start Smart Workout",
      ctaSecondary: "Explore Features"
    },
    features: {
      badge: "State-of-the-art Coaching Tech",
      title: "Smart Training, Real Results",
      subtitle: "Combining world-class fitness expertise with on-device computer vision and smart analytics to maximize your muscle adaptation.",
      item1Title: "Personalized Workout Plans",
      item1Desc: "Fully adapted plans custom-tailored to your body composition, daily energy, historical weight records, and fat/muscle goals by our core Tarx AI engine.",
      item1Badge: "Highly Adaptive",
      item2Title: "Posture & Joint Form Analysis",
      item2Desc: "Using live skeletal joint detection, the app monitors your joint angles during exercises, preventing lower-back injuries and improper posture in real-time.",
      item2Badge: "Live Joint Tracking",
      item3Title: "Analytics & Progress Graphs",
      item3Desc: "Automatically registers your rep speed, rest duration, and lift weights, rendering engineering-grade dashboards to monitor your physical output.",
      item3Badge: "Sports Engineering Docs",
      subBar1: "Complete support for hypertrophy, cutting, and physical conditioning",
      subBar2: "No extra sensors required - powered 100% by your smartphone camera",
      subBar3: "Dynamic reinforcement updates for coaching behaviors"
    },
    showcase: {
      row1Badge: "Advanced Strength Analytical Systems",
      row1Title: "Visualize Your Growth with Clear Charts",
      row1Desc: "Forget about handwriting workout logs. Tarx automatically aggregates lift tonnage, physical volume, muscle frequency, and calories burned into beautiful, high-tech 3D charts.",
      row1Bullet1Title: "Micro Load Increase Tracker",
      row1Bullet1Desc: "Track progressive overload trends on an elegant interactive line chart.",
      row1Bullet2Title: "Daily Streak Heatmap",
      row1Bullet2Desc: "Interactive calendar visualizer styled in neat commit-grid aesthetics.",
      row2Badge: "Step-by-step Interactive Training",
      row2Title: "Step-by-step Guided Workouts",
      row2Desc: "Remove all training anxiety from your routine. Every set features precise instruction videos, automated optimal rest timers, real-time pulse targets, and rep progress gauges.",
      row2Bullet1Title: "Autonomic Rest Timer",
      row2Bullet1Desc: "Scientifically calculated recovery windows based on previous exertion.",
      row2Bullet2Title: "Interactive 3D Muscle Target Maps",
      row2Bullet2Desc: "Guides you through focal muscle activation vectors for each posture."
    },
    stats: {
      item1Val: "+120",
      item1Suf: "Exercises",
      item1Label: "Video Guided Workouts",
      item1Desc: "Illustrated steps with skeleton check overlays",
      item2Val: "+30",
      item2Suf: "Programs",
      item2Label: "Ready-made Fitness Plans",
      item2Desc: "Curated by top-tier international fitness coaches",
      item3Val: "24/7",
      item3Suf: "Advisor",
      item3Label: "Personal AI Fitness Trainer",
      item3Desc: "On-demand technical & nutritional advise anytime",
      item4Val: "100%",
      item4Suf: "Custom",
      item4Label: "Fully Personalized Metrics",
      item4Desc: "Direct adaptation to your force boundaries"
    },
    cta: {
      badge: "Exclusive VIP Early Beta Access",
      title: "Ready to Forge Your Absolute Strongest Self?",
      subtitle: "Begin training smarter starting today. Secure your early beta invitation to start utilizing the full powers of Tarx Personal Coaching AI.",
      placeholder: "Enter your email address...",
      button: "Start Free Trial",
      sending: "Registering...",
      successTitle: "Your email has been successfully registered!",
      successDesc: "Welcome to Tarx VIP guild. A custom invite credential and setup details will be delivered to you via email shortly.",
      successPromoCode: "PROMO CODE",
      successPromoVal: "TARX_BETA",
      successQueue: "YOUR QUEUE NO.",
      successQueueVal: "#1024",
      downloadsTitle: "Get it on your preferred marketplace:",
      trialBadge: "Includes unlimited 14-day trial. No credit card required."
    },
    aboutPage: {
      title: "About Tarx",
      seoTitle: "About Us | Tarx Advanced AI Training Platform",
      seoDesc: "Discover the technology behind Tarx AI Gym, and how digital skeleton posture analysis is changing modern bodybuilding and health forever.",
      introTitle: "A Digital Revolution in Fitness & Bodybuilding",
      introDesc1: "Tarx is a futuristic fitness and health ecosystems designed for both pro bodybuilders and amateur gym-goers. Integrating modern computer-vision structures, we deliver personal coach and live skeletal tracking right onto your pocket screens. We believe everyone's biomechanics are uniquely specialized.",
      introDesc2: "By phasing out rigid static routines and paper sheets, Tarx guides you with adaptive weight targets, rest, and fatigue level checks. It functions like an elite coach, minimizing injury risks and pushing muscle fibers to peak output.",
      visionTitle: "Our Strategic Mission",
      visionDesc: "To democratize elite sports coaching via affordable, high-tech AI structures. We are dedicated to providing premier sports coaching without heavy cost barriers.",
      featuresTitle: "Core Features of Tarx Smart Workouts",
      featuresList: [
        "Dynamic, long-term athletic workouts structured by local model reinforcement",
        "Deep computer vision tracking of skeletal postures during critical lifts like squats",
        "Automatic, high-fidelity registration of sets, repetitions, and rest values",
        "Comprehensive library of over 120 detailed exercises with elegant 3D tutorials",
        "Sleep, posture, and wellness adaptation advice"
      ],
      valuesTitle: "Our Integrity & Values",
      values: [
        { title: "Scientific Rigour", desc: "All metrics are computed based on the latest physical conditioning and metabolic models." },
        { title: "Privacy Safeguards", desc: "Physical records are treated as medical secrets, encrypted end-to-end on devices." },
        { title: "Empowering UX Look", desc: "Sleek and eye-safe minimal dark layouts to keep your brain focused in intense spaces." }
      ]
    },
    privacyPage: {
      title: "Privacy Policy",
      seoTitle: "Privacy Policy | Tarx App - Secure Health Data Protection",
      seoDesc: "Read our official guidelines explaining how Tarx collects, manages, encrypts, and handles physical, tracking, and workout data.",
      lastUpdated: "Last Updated: June 2026",
      tocTitle: "Document Sections",
      sections: [
        {
          id: "collect",
          title: "1. Data We Collect",
          content: [
            "Account credentials such as email address, age, gender, weight, height, and chosen fitness targets to tailor our core calculations.",
            "Historical activity logs containing rep speed, lift weights, rest thresholds, and active streak duration.",
            "Camera feed data (optional) if you actively switch on live posture check. Note: image processing runs entirely on your device local memory via web assembly. We absolutely do not save or upload video feeds to external services."
          ]
        },
        {
          id: "use",
          title: "2. How We Use Data",
          content: [
            "Generating and adapting premium sports routines.",
            "Computing precise athletic tonnage logs and metabolic targets.",
            "Displaying instant safety prompts in case of dangerous back/spine angles during deadlifts.",
            "Enforcing structural debugging layers of the smart assistant model."
          ]
        },
        {
          id: "account",
          title: "3. Account Preferences",
          content: [
            "You can modify your physical metrics inside settings or request permanent destruction of your account data anytime."
          ]
        },
        {
          id: "analytics",
          title: "4. Anonymized Telemetry",
          content: [
            "We employ swift on-site analytics to monitor app load speed and technical stability, completely anonymous and detached from personal credentials."
          ]
        },
        {
          id: "security",
          title: "5. Data Security",
          content: [
            "We maintain strict technical filters and firewalls to block unauthorized access, change, or exposure of health files.",
            "Standard end-to-end TLS/SSL layers govern all dynamic operations."
          ]
        },
        {
          id: "contact",
          title: "6. Get in Touch",
          content: [
            "For any queries regarding personal data, email our specialists anytime at tvarxapp@gmail.com."
          ]
        }
      ]
    },
    termsPage: {
      title: "Terms of Service",
      seoTitle: "Terms of Service & Health Disclaimer | Tarx App",
      seoDesc: "Our legal terms of use, health waivers, subscription policies, and code boundaries for the Tarx mobile application.",
      lastUpdated: "Last Updated: June 2026",
      tocTitle: "Document Sections",
      sections: [
        {
          id: "accept",
          title: "1. Acceptance of Terms",
          content: [
            "By setting up, running, or accessing Tarx Mobile applications, you indicate absolute compliance with these legal terms. If you disagree, do not use the service."
          ]
        },
        {
          id: "disclaimer",
          title: "2. Health & Fitness Waiver (Critical)",
          content: [
            "Tarx is not a licensed medical center. Our coaching suggestions are not medical advice.",
            "Working out with heavy barbells involves serious physical risks. You must evaluate your cardiovascular and skeletal health with a medical expert beforehand.",
            "We are not liable for physical pain, injuries, hernia, back pain, or secondary conditions occurring during or after executing workouts."
          ]
        },
        {
          id: "account",
          title: "3. Member Accounts & In-App Purchases",
          content: [
            "You are solely responsible for preventing password leakage and all routines saved under your profile.",
            "Advanced model coaching features are subject to marketplace payments (Bazaar, Myket, or App Store). Local prices and auto-renew details are shown beforehand."
          ]
        },
        {
          id: "use",
          title: "4. Permitted Actions",
          content: [
            "The app is licensed strictly for individual, non-commercial workout purposes.",
            "Reverse-engineering, server scraping, or unauthorized parsing of Tarx 3D animation files is legally prosecuted."
          ]
        },
        {
          id: "limit",
          title: "5. Limitation of Liability",
          content: [
            "Tarx provides services on an 'as is' basis without warranties. There are no guarantees of specific bodybuilding prizes or weight goals."
          ]
        },
        {
          id: "contact",
          title: "6. Support & Legal Inquiries",
          content: [
            "For bug tickets, partnership proposals, or structural feedback, contact our legal desk at tvarxapp@gmail.com."
          ]
        }
      ]
    },
    footer: {
      description: "Tarx advanced luxury fitness ecosystems integrate smart machine vision with sports methodologies to maximize and guide your physical potentials.",
      storeDownloadTitle: "Get Tarx on your portable device",
      copyright: "All rights reserved by Tarx.",
      craftedWith: "Crafted with devotion for yesterday's visionaries and today's champions"
    }
  }
};
