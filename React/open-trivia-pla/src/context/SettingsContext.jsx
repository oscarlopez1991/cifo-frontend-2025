import { createContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("quizSettings");
    return saved
      ? JSON.parse(saved)
      : {
          number: "6",
          category: "Sports",
          difficulty: "Easy",
        };
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("quizSettings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (property, value) => {
    setSettings({ ...settings, [property]: value });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
