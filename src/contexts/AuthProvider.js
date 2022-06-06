import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useSettings } from "./SettingsProvider";
import { useFilter } from "./FilterProvider";
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const { cleanFilter } = useFilter();
  const [signed, setSigned] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadingStorageData() {
      const storageSigned = await AsyncStorage.getItem("@CF:signed");
      const storageCurrentUser = await AsyncStorage.getItem("@CF:user");
      const storageSettings = await AsyncStorage.getItem("@CF:settings");
      if (storageSigned && storageCurrentUser && storageSettings) {
        setSigned(JSON.parse(storageSigned));
        setCurrentUser(JSON.parse(storageCurrentUser));
        setLoading(false);

        const settings = JSON.parse(storageSettings);
        const currentUser = JSON.parse(storageCurrentUser);
        api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        api.defaults.headers.post["Content-Type"] =
          "application/x-www-form-urlencoded";
        api.defaults.auth = {
          username: currentUser.user,
          password: currentUser.user,
        };
        api.defaults.baseURL = `${settings.protocol}${settings.server}:${settings.port}/${settings.endpoint}`;
        //inserido valor default
        api.defaults.timeout = 0;
      } else {
        setLoading(false);
      }
    }
    loadingStorageData();
  }, []);

  async function signIn(data) {
    setSigned(true);
    //inserido valor default
    api.defaults.timeout = 0;
    setCurrentUser({ user: data.user, password: data.password });
    await AsyncStorage.setItem("@CF:signed", JSON.stringify(true));
    await AsyncStorage.setItem(
      "@CF:user",
      JSON.stringify({ user: data.user, password: data.password })
    );
  }
  async function signOut() {
    setSigned(false);
    setCurrentUser(null);
    cleanFilter();
    await AsyncStorage.setItem("@CF:signed", JSON.stringify(false));
    await AsyncStorage.setItem("@CF:user", JSON.stringify(""));
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, currentUser, signed, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
