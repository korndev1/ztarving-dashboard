"use client";

import { Colors } from "@/Constant/Colors";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ChangeLanguage() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "th");

  const changeLanguage = (newLang: string) => {
    if (i18n.language !== newLang) {
      i18n.changeLanguage(newLang);
      setLang(newLang); // Set immediately for instant UI feedback
    }
  };

  useEffect(() => {
    setLang(i18n.language); // Keep in sync if changed elsewhere
  }, [i18n.language]);

  return (
    <div>
      <button
        style={{
          color: lang === "en" ? Colors.white : Colors.primary,
          marginRight: 5,
          backgroundColor: lang === "en" ? Colors.primary : Colors.white,
          padding: 10,
          borderRadius: 10,
        }}
        onClick={() => changeLanguage("en")}
      >
        English
      </button>
      <button
        style={{
          color: lang === "th" ? Colors.white : Colors.primary,
          // marginRight: 10,
          backgroundColor: lang === "th" ? Colors.primary : Colors.white,
          padding: 10,
          borderRadius: 10,
        }}
        onClick={() => changeLanguage("th")}
      >
        ไทย
      </button>
    </div>
  );
}
