// src/pages/api/send-password-reset.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Firebase client app 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { email } = JSON.parse(req.body);
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    await sendPasswordResetEmail(auth, email);
    return res.status(200).json({ message: "Password reset email sent" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Password reset error:", message);
    return res.status(500).json({ error: message });
  }
}