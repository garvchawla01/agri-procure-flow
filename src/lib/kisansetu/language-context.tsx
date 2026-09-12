import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "hi";

export const translations = {
  en: {
    // Header & Navigation
    appName: "KISANSETU",
    tagline: "SMART PROCUREMENT",
    navHome: "Home",
    navHowItWorks: "How It Works",
    navCentres: "Procurement Centres",
    navAbout: "About",
    navContact: "Contact",
    farmerLogin: "Farmer Login",
    officerLogin: "Officer Login",

    // Home Hero & Landing
    heroBadge: "Connecting Farmers to Fair & Transparent Procurement",
    heroTitle1: "Smart Procurement.",
    heroTitle2: "Less Waiting.",
    heroTitle3: "More Transparency.",
    heroDesc: "KISANSETU connects farmers with procurement centres through digital scheduling, token-based tracking and real-time status updates.",
    btnStartRequest: "Start Procurement Request",
    btnTrackProcurement: "Track My Procurement",
    statFarmersServed: "Farmers served",
    statCentres: "Procurement centres",
    statLessWaiting: "Less waiting",

    // Farmer Request Form
    reqTitle: "New Procurement Request",
    reqDesc: "Fill in the details below. Your token and time slot are generated immediately after submission.",
    labelFarmerName: "Farmer name",
    labelFarmerId: "Farmer ID",
    labelCropType: "Crop type",
    labelQuantity: "Expected quantity (kg)",
    labelCentre: "Procurement centre",
    labelDate: "Preferred date",
    labelSlot: "Preferred slot",
    labelContact: "Contact number",
    reqInfoBadge: "After submission you will receive a unique token with a QR code and a confirmed arrival slot.",
    btnSubmit: "Submit Request",
    submitting: "Submitting…",

    // Farmer Track
    trackTitle: "Track Your Procurement",
    trackDesc: "Enter your token number to fetch real-time status directly from the Cloud Database.",
    labelTokenInput: "Enter token number",
    btnTrackStatus: "Track Status",
    currentStatus: "Current status",
    timelineHeading: "Procurement timeline",
    refreshStatus: "Refresh Status",
    noSlotFound: "No procurement request found for this token.",

    // Summary Details
    cropAndQty: "Crop & Quantity",
    assignedSlot: "Assigned Slot",
    tokenNumber: "Token number",
    date: "Date",
    kisanIdOrPhone: "Kisan ID / Phone",
  },
  hi: {
    // Header & Navigation
    appName: "किसानसेतु",
    tagline: "स्मार्ट खरीद प्रणाली",
    navHome: "होम",
    navHowItWorks: "प्रक्रिया समझें",
    navCentres: "खरीद केंद्र",
    navAbout: "परिचय",
    navContact: "संपर्क",
    farmerLogin: "किसान लॉगिन",
    officerLogin: "अधिकारी लॉगिन",

    // Home Hero & Landing
    heroBadge: "किसानों को पारदर्शी एवं निष्पक्ष खरीद से जोड़ना",
    heroTitle1: "स्मार्ट खरीद।",
    heroTitle2: "कम इंतजार।",
    heroTitle3: "पूरी पारदर्शिता।",
    heroDesc: "किसानसेतु डिजिटल शेड्यूलिंग, टोकन आधारित ट्रैकिंग और रियल-टाइम अपडेट के जरिए किसानों को खरीद केंद्रों से जोड़ता है।",
    btnStartRequest: "नई खरीद अनुरोध शुरू करें",
    btnTrackProcurement: "खरीद स्थिति ट्रैक करें",
    statFarmersServed: "लाभान्वित किसान",
    statCentres: "सक्रिय खरीद केंद्र",
    statLessWaiting: "इंतजार के समय में कमी",

    // Farmer Request Form
    reqTitle: "नया खरीद अनुरोध",
    reqDesc: "नीचे अपना विवरण भरें। फॉर्म जमा करते ही तुरंत डिजिटल टोकन और समय स्लॉट मिल जाएगा।",
    labelFarmerName: "किसान का नाम",
    labelFarmerId: "किसान आईडी",
    labelCropType: "फसल का प्रकार",
    labelQuantity: "अनुमानित मात्रा (किलो)",
    labelCentre: "खरीद केंद्र चुनें",
    labelDate: "पसंदीदा तारीख",
    labelSlot: "पसंदीदा समय स्लॉट",
    labelContact: "मोबाइल नंबर",
    reqInfoBadge: "अनुरोध जमा होने के बाद आपको क्यूआर कोड और निर्धारित समय के साथ एक टोकन प्राप्त होगा।",
    btnSubmit: "अनुरोध जमा करें",
    submitting: "जमा हो रहा है…",

    // Farmer Track
    trackTitle: "अपनी खरीद की स्थिति ट्रैक करें",
    trackDesc: "क्लाउड डेटाबेस से रियल-टाइम स्थिति देखने के लिए अपना टोकन नंबर दर्ज करें।",
    labelTokenInput: "टोकन नंबर दर्ज करें",
    btnTrackStatus: "स्थिति जांचें",
    currentStatus: "वर्तमान स्थिति",
    timelineHeading: "खरीद प्रक्रिया की समयसीमा",
    refreshStatus: "स्थिति रीफ्रेश करें",
    noSlotFound: "इस टोकन नंबर के लिए कोई स्लॉट नहीं मिला।",

    // Summary Details
    cropAndQty: "फसल और वजन",
    assignedSlot: "निर्धारित स्लॉट",
    tokenNumber: "टोकन संख्या",
    date: "तारीख",
    kisanIdOrPhone: "किसान आईडी / फोन",
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
    if (saved === "hi" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("kisansetu_lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}