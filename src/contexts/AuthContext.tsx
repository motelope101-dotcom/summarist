"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Firebase config pulled from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Initialize Firebase app once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Only create auth instance in browser
const auth = typeof window !== "undefined" ? getAuth(app) : null;

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<User | null>;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
};

// Default context values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async () => null,
  login: async () => null,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!!auth);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    if (!auth) return null;
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    setUser(cred.user);
    return cred.user;
  };

  const login = async (email: string, password: string) => {
    if (!auth) return null;
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setUser(cred.user);
    return cred.user;
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);