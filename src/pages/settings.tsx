"use client";

export default function SettingsPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white">Settings</h1>
      <p className="mt-4 text-neutral-400">
        Manage your account preferences and app configuration here.
      </p>
      <p className="mt-2 text-neutral-500 text-sm">
        (Later: integrate Firebase Auth for profile, password reset, and personalization.)
      </p>
    </section>
  );
}