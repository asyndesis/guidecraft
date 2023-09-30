import React, { createContext, useContext, useEffect, useState } from "react";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app, auth } from "@/config/firebase"; // Import your Firebase initialization here

// Define the shape of your user object
interface User {
  uid: string;
  email: string | null;
}

// Define the shape of your AuthContext
interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook for using the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Create the AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Listen for changes in the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? { uid: user.uid, email: user.email } : null);
    });

    return () => unsubscribe();
  }, []);

  // Function to sign up a user
  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;
      setUser({ uid: newUser.uid, email: newUser.email });
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  // Function to sign in a user
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const existingUser = userCredential.user;
      setUser({ uid: existingUser.uid, email: existingUser.email });
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  // Function to sign out a user
  const signOutUser = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    user,
    signUp,
    signIn,
    signOut: signOutUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
