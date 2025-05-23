export interface Translations {
  navigation: {
    logout: string;
    projects: string;
    mosques: string;
    blockedProjects: string;
  };
  auth: {
    login: string;
    username: string;
    password: string;
    submit: string;
    welcome: string;
  };
  projects: {
    title: string;
    addNew: string;
    edit: string;
    delete: string;
    status: string;
    details: string;
    search: string;
    projectName: string;
    contractValue: string;
    startDate: string;
    completionPercentage: string;
  };
  mosques: {
    title: string;
    addNew: string;
    edit: string;
    delete: string;
    location: string;
    details: string;
    search: string;
    mosqueName: string;
    area: string;
    capacity: string;
    address: string;
    imamName: string;
  };
  blockedProjects: {
    title: string;
    addNew: string;
    edit: string;
    delete: string;
    reason: string;
    status: string;
    details: string;
    search: string;
    projectName: string;
    blockDate: string;
    blockReason: string;
    currentStatus: string;
    solution: string;
  };
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    search: string;
    loading: string;
    error: string;
    success: string;
    confirm: string;
    back: string;
  };
}

export const ar: Translations = {
  navigation: {
    logout: "خروج",
    projects: "المشروعات",
    mosques: "المساجد",
    blockedProjects: "المشاريع المتعثرة"
  },
  auth: {
    login: "تسجيل الدخول",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    submit: "دخول",
    welcome: "مرحباً بك في نظام المشاريع"
  },
  projects: {
    title: "المشروعات",
    addNew: "إضافة مشروع جديد",
    edit: "تعديل المشروع",
    delete: "حذف المشروع",
    status: "الحالة",
    details: "تفاصيل المشروع",
    search: "بحث عن مشروع",
    projectName: "اسم المشروع",
    contractValue: "القيمة التعاقدية",
    startDate: "تاريخ البدء",
    completionPercentage: "النسبة المنفذة"
  },
  mosques: {
    title: "المساجد",
    addNew: "إضافة مسجد جديد",
    edit: "تعديل المسجد",
    delete: "حذف المسجد",
    location: "الموقع",
    details: "تفاصيل المسجد",
    search: "بحث عن مسجد",
    mosqueName: "اسم المسجد",
    area: "المساحة",
    capacity: "السعة",
    address: "العنوان",
    imamName: "اسم الإمام"
  },
  blockedProjects: {
    title: "المشاريع المتعثرة",
    addNew: "إضافة مشروع متعثر",
    edit: "تعديل المشروع المتعثر",
    delete: "حذف المشروع المتعثر",
    reason: "سبب التعثر",
    status: "الحالة",
    details: "تفاصيل المشروع",
    search: "بحث عن مشروع متعثر",
    projectName: "اسم المشروع",
    blockDate: "تاريخ التعثر",
    blockReason: "سبب التعثر",
    currentStatus: "الحالة الحالية",
    solution: "الحل المقترح"
  },
  common: {
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    search: "بحث",
    loading: "جاري التحميل...",
    error: "حدث خطأ",
    success: "تمت العملية بنجاح",
    confirm: "تأكيد",
    back: "رجوع"
  }
}; 