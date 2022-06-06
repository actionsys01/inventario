import React, { useState, useEffect } from "react";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { useAuth } from "../contexts/AuthProvider";
import Loading from "../components/loading/Loading";
import Network from "../components/network/Network";
import NetInfo from "@react-native-community/netinfo";

export default function Routes() {
  const { signed, loading } = useAuth();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
  }, []);

  if (!isConnected) {
    return <Network />;
  }

  if (loading) {
    return <Loading />;
  }

  return signed ? <AuthRoutes /> : <AppRoutes />;
}
