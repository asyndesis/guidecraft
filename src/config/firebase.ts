import { initializeApp } from "firebase/app";
import Constants from "expo-constants";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: Constants.expoConfig?.extra?.measurementId,
};

const options =
  Platform.OS !== "web"
    ? {
        persistence: getReactNativePersistence(AsyncStorage),
      }
    : undefined;

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, options);

export { app, auth };
