import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "hi";

export const translations = {
  en: {
    brandName: "KISANSETU",
    brandTagline: "Connecting Farmers to Fair & Transparent Procurement.",
    switchLang: "हिंदी",
    signOut: "Sign out",
    getStarted: "Get Started",

    navHome: "Home",
    navHowItWorks: "How It Works",
    navCentres: "Procurement Centres",
    navAbout: "About",
    navContact: "Contact",
    farmerLogin: "Farmer Login",
    officerLogin: "Officer Login",

    heroBadge: "Connecting Farmers to Fair & Transparent Procurement",
    heroTitle: "Smart Procurement. Less Waiting. More Transparency.",
    heroTitle1: "Smart Procurement.",
    heroTitle2: "Less Waiting.",
    heroTitle3: "More Transparency.",
    heroDesc: "KISANSETU connects farmers with procurement centres through digital scheduling, token-based tracking and real-time status updates.",
    btnStartRequest: "Start Procurement Request",
    btnTrackProcurement: "Track My Procurement",
    statFarmersServed: "Farmers served",
    statCentres: "Procurement centres",
    statLessWaiting: "Less waiting",
    yourToken: "Your token",
    slotSample: "Slot 10:00 AM – 11:00 AM",

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

    kisanDashboardTitle: "Kisan Dashboard",
    farmerSubtitle: "Rajesh Kumar • KSN1024 • Rampur",
    farmerNavDashboard: "Dashboard",
    farmerNavRequest: "New Request",
    farmerNavTrack: "Track Status",
    farmerNavSchedule: "Procurement Schedule",
    farmerNavNotifications: "Notifications",
  },
  hi: {
    brandName: "किसानसेतु",
    brandTagline: "किसानों को निष्पक्ष और पारदर्शी खरीद व्यवस्था से जोड़ना।",
    switchLang: "English",
    signOut: "लॉग आउट",
    getStarted: "शुरू करें",

    navHome: "होम",
    navHowItWorks: "प्रक्रिया समझें",
    navCentres: "खरीद केंद्र",
    navAbout: "परिचय",
    navContact: "संपर्क",
    farmerLogin: "किसान लॉगिन",
    officerLogin: "अधिकारी लॉगिन",

    heroBadge: "किसानों को निष्पक्ष और पारदर्शी खरीद व्यवस्था से जोड़ना",
    heroTitle: "स्मार्ट खरीद। न्यूनतम प्रतीक्षा। पूर्ण पारदर्शिता।",
    heroTitle1: "स्मार्ट खरीद।",
    heroTitle2: "न्यूनतम प्रतीक्षा।",
    heroTitle3: "पूर्ण पारदर्शिता।",
    heroDesc: "किसानसेतु डिजिटल शेड्यूलिंग, टोकन ट्रैकिंग और लाइव स्टेटस अपडेट के माध्यम से किसानों को खरीद केंद्रों से सीधे जोड़ता है।",
    btnStartRequest: "नया खरीद अनुरोध दर्ज करें",
    btnTrackProcurement: "खरीद स्थिति ट्रैक करें",
    statFarmersServed: "लाभान्वit किसान",
    statCentres: "सक्रिय खरीद केंद्र",
    statLessWaiting: "इंतजार में कमी",
    yourToken: "आपका टोकन",
    slotSample: "स्लॉट सुबह 10:00 – 11:00",

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

    kisanDashboardTitle: "किसान डैशबोर्ड",
    farmerSubtitle: "राजेश कुमार • KSN1024 • रामपुर",
    farmerNavDashboard: "डैशबोर्ड",
    farmerNavRequest: "नया अनुरोध",
    farmerNavTrack: "स्थिति ट्रैक करें",
    farmerNavSchedule: "खरीद अनुसूची",
    farmerNavNotifications: "सूचनाएं",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations["en"];
}

// Fallback context taaki app kabhi crash na ho
const fallbackValue: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: translations.en,
};

const LanguageContext = createContext<LanguageContextType>(fallbackValue);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kisansetu_lang") as Language;
      if (saved === "en" || saved === "hi") {
        setLanguageState(saved);
      }
    } catch (_) {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("kisansetu_lang", lang);
    } catch (_) {}
  };

  const value = {
    language,
    setLanguage,
    t: translations[language] || translations.en,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// CRITICAL FIX: No `throw Error` — always returns valid translation
export function useTranslation(): LanguageContextType {
  const context = useContext(LanguageContext);
  return context || fallbackValue;
}