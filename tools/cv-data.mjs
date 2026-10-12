// Single source of truth for the CV content, consumed by both the .docx and .pdf renderers.

// In an RTL paragraph, a Latin token that STARTS with punctuation (".NET Core") gets its
// leading dot reordered to the end by the bidi algorithm. An LRM before the dot anchors it.
const LRM = '‎';
function fixBidi(node) {
  if (typeof node === 'string') return node.replace(/(?<!‎)\.(?=[A-Za-z])/g, LRM + '.');
  if (Array.isArray(node)) return node.map(fixBidi);
  if (node && typeof node === 'object') {
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, fixBidi(v)]));
  }
  return node;
}

export const contact = {
  name_en: 'Nadav Reubens',
  name_he: 'נדב ראובנס',
  phone: '(054)-813-7433',
  email: 'Nadavreubens8@gmail.com',
  address_en: 'Hashkedim, Qiryat Ata',
  address_he: 'השקדים, קריית אתא',
  linkedin: 'linkedin.com/in/nadav-reubens-a5957a314',
};

export const en = {
  dir: 'ltr',
  title_summary: 'PROFESSIONAL SUMMARY',
  summary:
    'Backend developer and startup partner with 2+ years of hands-on experience building production .NET Core APIs, automations, and cloud integrations. I own product features end-to-end, from writing the spec and designing the API to running them in production. Recent work includes an insurance quote aggregator integrating 12 carriers, and a commission calculation and monitoring platform covering 20+ carriers. Experienced in authentication systems, SQL Server, background workers, and integrating Google Cloud, Microsoft 365, and AWS services. Fast learner with strong ownership, comfortable working in a startup environment.',

  title_skills: 'TECHNICAL SKILLS',
  skills: [
    { group: 'Backend & Architecture', items: 'C# / .NET Core (.NET 6–8) · RESTful API design · Entity Framework Core · SQL Server (SSMS) · Authentication (JWT, claims, token lifetime, lockout, password reset) · Background workers & automations' },
    { group: 'Cloud & Integrations', items: 'AWS S3 · Google Cloud Vision (OCR) · Gmail API · Microsoft Graph · Supabase / PostgreSQL · Vercel · Currently learning: AWS SQS, AWS Step Functions' },
    { group: 'Frontend (Working Knowledge)', items: 'Angular · React · TypeScript · HTML / CSS' },
    { group: 'DevOps & Tools', items: 'IIS deployment · Git / GitHub (team workflow) · Postman · Make · JSON / XML' },
  ],

  title_soft: 'SOFT SKILLS',
  soft: ['Strong problem-solving', 'Ownership & responsibility', 'Fast learner', 'Startup mindset', 'Team collaboration'],

  title_exp: 'EXPERIENCE',
  exp: [
    {
      date: '06/2024 – Present',
      role: 'Backend Developer & Partner',
      org: 'InsurTech Startup, Israel',
      bullets: [
        'Own product features end-to-end, from writing the spec and designing the API to running them in production',
        'Designed and developed REST APIs using .NET Core',
        'Built the authentication module: JWT issuing, claims, token lifetime, failed-login lockout, and password reset flows',
        'Developed background workers and automations driving business workflows',
        'Worked with SQL Server on queries, relations, and optimization',
        'Integrated external APIs: insurance carrier quote APIs, Gmail API and Microsoft Graph for email automation, and Google Cloud Vision OCR for agent license verification',
        'Deployed and maintained services on IIS, with a migration to AWS EC2 planned',
        'Collaborated with the frontend team (Angular) and took part in system design decisions',
        'Managed source control using Git / GitHub in an agile environment',
      ],
    },
    {
      date: '08/2021 – 06/2024',
      role: 'Shift Manager',
      org: 'Electra (02/2022–06/2024) · T&M, Haifa (08/2021–02/2022)',
      bullets: [
        'Managed on-site teams, security procedures, and coordination',
        'Enforced security policies to maintain a safe environment',
        'Worked under pressure and handled operational responsibility',
      ],
    },
    {
      date: '08/2020 – 03/2021',
      role: 'Independent Business',
      org: 'Customizing Shoes, Qiryat Ata',
      bullets: ['Managed independent projects and customers', 'Delivered customized solutions'],
    },
    {
      date: '04/2019 – 11/2019',
      role: 'Electrician Assistant',
      org: 'Elad-Barak, Haifa',
      bullets: ['Electrical installations and maintenance', 'Reading technical plans', 'Hands-on technical problem solving'],
    },
    {
      date: '03/2015 – 03/2018',
      role: 'Gunsmith',
      org: 'Israel Defense Forces',
      intro: 'Started as a commander in the Air Force, continued duty in a fighter battalion as a Gunsmith while doing war training, serving as operator of a classified system and travel commander.',
      bullets: [
        'Identified issues, analyzed information, and provided solutions to problems',
        'Planned and coordinated tasks and determined the material required to complete assignments',
        'Filled a variety of reports and documents to ensure smooth operations and meet monthly goals',
      ],
    },
    {
      date: '09/2014 – 02/2015',
      role: "Teacher's Assistant",
      org: 'Rogozin High School, Qiryat Ata',
      bullets: ['Helped children with learning difficulties', 'Helped teachers recognize learning issues through one-to-one support instruction'],
    },
  ],

  title_proj: 'SELECTED PROJECTS',
  proj: [
    {
      name: 'Insurance Quote Aggregator',
      role: 'Feature Owner & Backend Developer',
      bullets: [
        'Led the car and home insurance quote aggregator, from writing the spec to shipping it',
        'Consumed the quote APIs of 12 insurance carriers and normalized their responses into unified endpoints for the app',
        'Enabled side-by-side price comparison across carriers',
      ],
      stack: '.NET Core, REST APIs, SQL Server',
    },
    {
      name: 'Commission Automation Platform',
      role: 'Backend Developer · Current Focus',
      bullets: [
        'Automating commission calculation and monitoring for insurance agencies across 20+ carriers',
        'Built a background worker that ingests commission reports forwarded by agents over email, extracts and virus-scans the attachments, and uploads them to S3, feeding the dashboard agencies use to monitor and filter their commissions',
      ],
      stack: '.NET Core, SQL Server, AWS S3, Gmail API, Microsoft Graph',
    },
    {
      name: 'Lead Management System',
      role: 'Backend & Integrations',
      bullets: [
        'Standalone lead-management product built alongside the core platform',
        'Integrated an AI classifier that reads inbound WhatsApp messages and determines whether each one is a genuine lead',
        'Automated Facebook lead-form ingestion via Make',
      ],
      stack: 'React, Supabase / PostgreSQL, Vercel, Make',
    },
  ],

  title_edu: 'EDUCATION',
  edu: [
    { date: '10/2021 – 05/2025', name: 'B.Sc. in Software Engineering (Graduated)', org: 'ORT Braude College of Engineering, Karmiel', bullets: ['Object-Oriented Programming', 'Algorithms & Data Structures', 'UML / OPM', 'C / Python / Assembly'] },
    { date: '03/2018', name: 'Android Development Course', org: 'John Bryce, Haifa', bullets: [] },
    { date: 'Graduated 2014', name: 'High School Diploma', org: 'Rogozin, Qiryat Ata', bullets: ['Computer Science & Physics'] },
  ],

  title_lang: 'LANGUAGES',
  lang: ['Hebrew – Native', 'English – High level (technical & conversational)'],
};

const heRaw = {
  dir: 'rtl',
  title_summary: 'תקציר מקצועי',
  summary:
    'מפתח Backend ושותף בסטארטאפ, עם מעל שנתיים ניסיון מעשי בבניית ממשקי .NET Core בסביבת פרודקשן, אוטומציות ואינטגרציות ענן. אחראי על פיצ׳רים מקצה לקצה, מכתיבת האפיון ותכנון ה-API ועד להרצה בפרודקשן. בין הפרויקטים האחרונים: אגרגטור הצעות מחיר לביטוח המשולב עם 12 חברות ביטוח, ומערכת לחישוב וניטור עמלות המכסה מעל 20 חברות ביטוח. בעל ניסיון במערכות אימות והרשאות, SQL Server, פיתוח Workers, ואינטגרציה עם שירותי Google Cloud, Microsoft 365 ו-AWS. לומד מהר, לוקח אחריות ומרגיש בבית בסביבת סטארטאפ.',

  title_skills: 'כישורים טכנולוגיים',
  skills: [
    { group: 'Backend וארכיטקטורה', items: 'C# / .NET Core (.NET 6–8) · תכנון REST API · Entity Framework Core · SQL Server (SSMS) · אימות והרשאות (JWT, claims, אורך חיי טוקן, חסימת משתמש, איפוס סיסמה) · Workers ואוטומציות' },
    { group: 'ענן ואינטגרציות', items: 'AWS S3 · Google Cloud Vision (OCR) · Gmail API · Microsoft Graph · Supabase / PostgreSQL · Vercel · בלמידה: AWS SQS, AWS Step Functions' },
    { group: 'Frontend (ידע עבודה)', items: 'Angular · React · TypeScript · HTML / CSS' },
    { group: 'DevOps וכלים', items: 'פריסה ב-IIS · Git / GitHub (עבודת צוות) · Postman · Make · JSON / XML' },
  ],

  title_soft: 'כישורים',
  soft: ['פתרון בעיות', 'לקיחת אחריות', 'למידה מהירה', 'חשיבת סטארטאפ', 'עבודת צוות'],

  title_exp: 'ניסיון תעסוקתי',
  exp: [
    {
      date: '06/2024 – היום',
      role: 'מפתח Backend ושותף',
      org: 'סטארטאפ אינשורטק, ישראל',
      bullets: [
        'אחריות על פיצ׳רים מקצה לקצה, מכתיבת האפיון ותכנון ה-API ועד להרצה בפרודקשן',
        'תכנון ופיתוח REST APIs באמצעות .NET Core',
        'בניית מודול האימות: הנפקת JWT, claims, אורך חיי טוקן, חסימה לאחר ניסיונות התחברות כושלים ותהליך איפוס סיסמה',
        'פיתוח Workers ואוטומציות המריצים תהליכים עסקיים',
        'עבודה עם SQL Server על שאילתות, יחסים בין טבלאות ואופטימיזציה',
        'חיבור APIs חיצוניים: ממשקי הצעות מחיר של חברות ביטוח, Gmail API ו-Microsoft Graph לאוטומציית מייל, ו-Google Cloud Vision OCR לאימות רישיונות סוכנים',
        'פריסה ותחזוקה של שירותים ב-IIS, עם מעבר מתוכנן ל-AWS EC2',
        'עבודה משותפת עם צוות ה-Frontend (Angular) והשתתפות בהחלטות תכנון המערכת',
        'ניהול קוד מקור באמצעות Git / GitHub בסביבת עבודה Agile',
      ],
    },
    {
      date: '08/2021 – 06/2024',
      role: 'אחראי משמרת, צוות אבטחה',
      org: 'אלקטרה (02/2022–06/2024) · T&M, חיפה (08/2021–02/2022)',
      bullets: ['ניהול צוות עובדים', 'אחריות על אבטחה ותפעול', 'עבודה בתנאי לחץ', 'רישיון נשק ואבטחה'],
    },
    {
      date: '08/2020 – 03/2021',
      role: 'עסק עצמאי',
      org: 'התאמה אישית של נעליים, קריית אתא',
      bullets: ['שירות לקוחות', 'עבודה עצמאית וניהול תהליכים', 'מחקר וביצוע פתרונות מותאמים'],
    },
    {
      date: '04/2019 – 11/2019',
      role: 'עוזר חשמלאי',
      org: 'אלעד-ברק, חיפה',
      bullets: ['התקנות חשמל', 'קריאת תוכניות', 'עבודה עם ציוד חשמלי'],
    },
    {
      date: '03/2015 – 03/2018',
      role: 'טכנאי נשק',
      org: 'שירות צבאי',
      intro: 'התחלתי כמפקד בחיל האוויר, המשכתי בתפקידי בגדוד קרבי בתור טכנאי נשק תוך כדי אימוני מלחמה, בהיותי מפעיל של מערכת מסווגת ומפקד נסיעות.',
      bullets: [
        'זיהוי תקלות, ניתוח מידע ומתן פתרונות לבעיות',
        'תכנון ותיאום משימות והזמנת החומר הנכון הנדרש לביצוע המטלות',
        'מילוי מגוון דוחות ומסמכים שונים כדי להבטיח פעולות חלקות ועמידה ביעדים חודשיים',
      ],
    },
    {
      date: '09/2014 – 02/2015',
      role: 'מורה עזר',
      org: 'תיכון רוגוזין, קריית אתא',
      bullets: ['עזרה לילדים עם קשיי למידה', 'לימוד פרטני וקבוצתי', 'עזרה למורים להכיר בבעיות למידה'],
    },
  ],

  title_proj: 'פרויקטים נבחרים',
  proj: [
    {
      name: 'אגרגטור הצעות מחיר לביטוח',
      role: 'אחראי פיצ׳ר ומפתח Backend',
      bullets: [
        'הובלת אגרגטור הצעות המחיר לביטוח רכב ודירה, מכתיבת האפיון ועד לעלייה לאוויר',
        'צריכת ממשקי ה-API של 12 חברות ביטוח ונרמול התשובות שלהן לאנדפוינטים אחידים עבור האפליקציה',
        'הנגשת השוואת מחירים זה מול זה בין החברות',
      ],
      stack: '.NET Core, REST APIs, SQL Server',
    },
    {
      name: 'מערכת אוטומציה לעמלות',
      role: 'מפתח Backend · הפרויקט הנוכחי',
      bullets: [
        'אוטומציה של חישוב וניטור עמלות עבור בתי סוכן בביטוח, מול יותר מ-20 חברות ביטוח',
        'בניית Worker שמקבל דוחות עמלות שסוכנים מעבירים במייל, מחלץ את הקבצים המצורפים, סורק אותם לווירוסים ומעלה אותם ל-S3, ומזין את הדשבורד שבו בתי הסוכן עוקבים אחרי העמלות ומסננים אותן',
      ],
      stack: '.NET Core, SQL Server, AWS S3, Gmail API, Microsoft Graph',
    },
    {
      name: 'מערכת ניהול לידים',
      role: 'Backend ואינטגרציות',
      bullets: [
        'מוצר עצמאי לניהול לידים שפותח לצד הפלטפורמה המרכזית',
        'שילוב מסווג AI שקורא הודעות WhatsApp נכנסות ומחליט אם כל הודעה היא ליד אמיתי',
        'אוטומציה ב-Make שמביאה לידים מטפסי לידים בפייסבוק אל תוך המערכת',
      ],
      stack: 'React, Supabase / PostgreSQL, Vercel, Make',
    },
  ],

  title_edu: 'השכלה',
  edu: [
    { date: '10/2021 – 05/2025', name: 'בוגר תואר ראשון בהנדסת תוכנה', org: 'המכללה האקדמית להנדסה אורט בראודה, כרמיאל', bullets: ['Object-Oriented Programming', 'Algorithms & Data Structures', 'UML / OPM', 'C / Python / Assembly'] },
    { date: '03/2018', name: 'Android Development Course', org: "ג'ון ברייס, חיפה", bullets: [] },
    { date: 'סיום לימודים 2014', name: 'תעודת בגרות', org: 'רוגוזין, קריית אתא', bullets: ['התמחות במדעי המחשב (C#, Visual Basic, Assembly)', 'הרחבה בפיזיקה'] },
  ],

  title_lang: 'שפות',
  lang: ['עברית – שפת אם', 'אנגלית ברמה גבוהה – טכנית, קריאה וכתיבה'],
};

export const he = fixBidi(heRaw);
