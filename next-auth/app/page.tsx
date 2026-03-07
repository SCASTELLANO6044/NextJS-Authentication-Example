"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/profile");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-white"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (session) {
    // Show loading while redirecting
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-white"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Redirecting to profile...
          </p>
        </div>
      </div>
    );
  }

  return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-black px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Welcome
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            You need to sign in to access this page.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="inline-block bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3 rounded-lg font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
}
