import React, { useState, useContext, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
const SettingsContext = createContext(null);
export function useSettings() {
  return useContext(SettingsContext);
}
export default function SettingProvider({ children }) {
  const [settings, setSettings] = useState({
    server: "",
    port: "",
    protocol: "",
    endpoint: "jderest",
  });

  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    async function loadingStorageData() {
      const storageSettings = await AsyncStorage.getItem("@CF:settings");
      if (storageSettings) {
        const settings = JSON.parse(storageSettings);
        setSettings(JSON.parse(storageSettings));
        setBaseUrl(
          `${settings.protocol}${settings.server}:${settings.port}/${settings.endpoint}`
        );
      }
    }

    loadingStorageData();
  }, []);

  async function saveSettings(data) {
    const { server, port, protocol, endpoint } = data;
    const settings = {
      server: server,
      port: port,
      protocol: protocol,
      endpoint: endpoint,
    };
    setBaseUrl(`${protocol}${server}:${port}/${endpoint}`);
    setSettings(settings);
    await AsyncStorage.setItem("@CF:settings", JSON.stringify(settings));
  }

  return (
    <SettingsContext.Provider value={{ settings, saveSettings, baseUrl }}>
      {children}
    </SettingsContext.Provider>
  );
}
