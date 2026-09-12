import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "hi";

export const translations = {
  en: {
    // Brand & Common
    brandName: "KISANSETU",
    brandTagline: "Connecting Farmers to Fair & Transparent Procurement.",
    switchLang: "हिंदी",
    langCode: "हिं",
    signOut: "Sign out",
    getStarted: "Get Started",

    // Public Header Navigation
    navHome: "Home",
    navHowItWorks: "How It Works",
    navCentres: "Procurement Centres",
    navAbout: "About",
    navContact: "Contact",
    farmerLogin: "Farmer Login",
    officerLogin: "Officer Login",

    // Landing Page - Hero
    heroBadge: "Connecting Farmers to Fair & Transparent Procurement",
    heroTitle: "Smart Procurement. Less Waiting. More Transparency.",
    heroDesc: "KISANSETU connects farmers with procurement centres through digital scheduling, token-based tracking and real-time status updates.",
    btnStartRequest: "Start Procurement Request",
    btnTrackProcurement: "Track My Procurement",
    statFarmersServed: "Farmers served",
    statCentres: "Procurement centres",
    statLessWaiting: "Less waiting",
    yourToken: "Your token",
    slotSample: "Slot 10:00 AM – 11:00 AM",

    // Farmer Layout & Navigation
    kisanDashboardTitle: "Kisan Dashboard",
    farmerSubtitle: "Rajesh Kumar • KSN1024 • Rampur",
    farmerNavDashboard: "Dashboard",
    farmerNavRequest: "New Request",
    farmerNavTrack: "Track Status",
    farmerNavSchedule: "Procurement Schedule",
    farmerNavNotifications: "Notifications",

    // Request Form (/farmer/request)
    formTitle: "New Procurement Request",
    formSubtitle: "Fill in the details below. Your token and time slot are generated immediately after submission.",
    fieldFarmerName: "Farmer name",
    fieldFarmerId: "Farmer ID",
    fieldCropType: "Crop type",
    fieldQuantity: "Expected quantity (kg)",
    fieldCentre: "Procurement centre",
    fieldPreferredDate: "Preferred date",
    fieldPreferredSlot: "Preferred slot",
    fieldContactNumber: "Contact number",
    formNotice: "After submission you will receive a unique token with a QR code and a confirmed arrival slot.",
    btnSubmitRequest: "Submit Request",
    submitting: "Submitting...",

    // Track Procurement (/farmer/track)
    trackTitle: "Track Procurement",
    trackSubtitle: "Enter your token number to view real-time procurement progress.",
    tokenInputPlaceholder: "e.g. A104 or KSN-2026-XXXX",
    btnTrack: "Track",
    stage1: "Token Generated",
    stage2: "Slot Assigned",
    stage3: "Arrived at Centre",
    stage4: "Weighed & Inspected",
    stage5: "Verified",
    stage6: "Payment Initiated",
    crop: "Crop",
    quantity: "Quantity",
    status: "Status",
    date: "Date",
    timeSlot: "Time Slot",

    // Officer Dashboard (/officer)
    officerDashboardTitle: "Procurement Officer Dashboard",
    officerNavOverview: "Overview",
    officerNavRequests: "All Requests",
    officerNavSchedule: "Centre Schedule",
    statTodayTokens: "Tokens Today",
    statWeighed: "Weighed & Cleared",
    statPending: "In Waiting Queue",
    actionScanQR: "Scan QR Token",
    actionUpdateStatus: "Update Status",
    tblFarmer: "Farmer",
    tblToken: "Token",
    tblCrop: "Crop",
    tblWeight: "Weight",
    tblStatus: "Status",
    tblActions: "Actions"
  },
  hi: {
    // Brand & Common
    brandName: "किसानसेतु",
    brandTagline: "किसानों को निष्पक्ष और पारदर्शी खरीद व्यवस्था से जोड़ना।",
    switchLang: "English",
    langCode: "EN",
    signOut: "लॉग आउट",
    getStarted: "शुरू करें",

    // Public Header Navigation
    navHome: "होम",
    navHowItWorks: "प्रक्रिया समझें",
    navCentres: "खरीद केंद्र",
    navAbout: "परिचय",
    navContact: "संपर्क",
    farmerLogin: "किसान लॉगिन",
    officerLogin: "अधिकारी लॉगिन",

    // Landing Page - Hero
    heroBadge: "किसानों को निष्पक्ष और पारदर्शी खरीद व्यवस्था से जोड़ना",
    heroTitle: "स्मार्ट खरीद। न्यूनतम प्रतीक्षा। पूर्ण पारदर्शिता।",
    heroDesc: "किसानसेतु डिजिटल शेड्यूलिंग, टोकन ट्रैकिंग और लाइव स्टेटस अपडेट के माध्यम से किसानों को खरीद केंद्रों से सीधे जोड़ता है।",
    btnStartRequest: "नया खरीद अनुरोध दर्ज करें",
    btnTrackProcurement: "खरीद स्थिति ट्रैक करें",
    statFarmersServed: "लाभान्वित किसान",
    statCentres: "सक्रिय खरीद केंद्र",
    statLessWaiting: "इंतजार में कमी",
    yourToken: "आपका टोकन",
    slotSample: "स्लॉट सुबह 10:00 – 11:00",

    // Farmer Layout & Navigation
    kisanDashboardTitle: "किसान डैशबोर्ड",
    farmerSubtitle: "राजेश कुमार • KSN1024 • रामपुर",
    farmerNavDashboard: "डैशबोर्ड",
    farmerNavRequest: "नया अनुरोध",
    farmerNavTrack: "स्थिति ट्रैक करें",
    farmerNavSchedule: "खरीद अनुसूची",
    farmerNavNotifications: "सूचनाएं",

    // Request Form (/farmer/request)
    formTitle: "नया खरीद अनुरोध",
    formSubtitle: "नीचे विवरण भरें। सबमिट करने के तुरंत बाद आपका डिजिटल टोकन और समय स्लॉट जारी हो जाएगा।",
    fieldFarmerName: "किसान का नाम",
    fieldFarmerId: "किसान आईडी",
    fieldCropType: "फसल का प्रकार",
    fieldQuantity: "अनुमानित मात्रा (किलो)",
    fieldCentre: "खरीद केंद्र",
    fieldPreferredDate: "पसंदीदा तारीख",
    fieldPreferredSlot: "पसंदीदा समय स्लॉट",
    fieldContactNumber: "संपर्क नंबर",
    formNotice: "अनुरोध सबमिट करने के बाद आपको क्यूआर कोड वाला एक डिजिटल टोकन और स्लॉट प्राप्त होगा।",
    btnSubmitRequest: "अनुरोध सबमिट करें",
    submitting: "दर्ज हो रहा है...",

    // Track Procurement (/farmer/track)
    trackTitle: "खरीद स्थिति ट्रैक करें",
    trackSubtitle: "रियल-टाइम खरीद प्रगति देखने के लिए अपना टोकन नंबर दर्ज करें।",
    tokenInputPlaceholder: "उदा. A104 या KSN-2026-XXXX",
    btnTrack: "ट्रैक करें",
    stage1: "टोकन जनरेट हुआ",
    stage2: "स्लॉट आवंटित हुआ",
    stage3: "केंद्र पर आगमन",
    stage4: "वजन और गुणवत्ता जांच",
    stage5: "दस्तावेज सत्यापित",
    stage6: "भुगतान शुरू",
    crop: "फसल",
    quantity: "मात्रा",
    status: "स्थिति",
    date: "तारीख",
    timeSlot: "समय स्लॉट",

    // Officer Dashboard (/officer)
    officerDashboardTitle: "खरीद अधिकारी डैशबोर्ड",
    officerNavOverview: "अवलोकन",
    officerNavRequests: "सभी अनुरोध",
    officerNavSchedule: "केंद्र शेड्यूल",
    statTodayTokens: "आज के कुल टोकन",
    statWeighed: "वजन व जांच पूर्ण",
    statPending: "प्रतीक्षारत कतार",
    actionScanQR: "क्यूआर टोकन स्कैन करें",
    actionUpdateStatus: "स्थिति अपडेट करें",
    tblFarmer: "किसान",
    tblToken: "टोकन",
    tblCrop: "फसल",
    tblWeight: "मात्रा (किलो)",
    tblStatus: "स्थिति",
    tblActions: "कार्रवाई"
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations["en"];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("kisansetu_lang") as Language;
    if (saved === "en" || saved === "hi") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("kisansetu_lang", lang);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}