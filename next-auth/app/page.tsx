"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  if (!session) {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-black">
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            NextAuth
          </h1>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
            className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Info Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              User Profile
            </h2>

            <div className="space-y-4">
              {session.user?.image && (
                <div className="flex justify-center mb-6">
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-zinc-200 dark:border-zinc-700"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Name
                </label>
                <p className="text-lg text-zinc-900 dark:text-white">
                  {session.user?.name || "Not provided"}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Email
                </label>
                <p className="text-lg text-zinc-900 dark:text-white break-all">
                  {session.user?.email || "Not provided"}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Provider
                </label>
                <p className="text-lg text-zinc-900 dark:text-white">
                  Google
                </p>
              </div>
            </div>
          </div>

          {/* Session Info Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Session Info
            </h2>

            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6 overflow-auto max-h-96">
              <pre className="text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                {JSON.stringify(
                  {
                    user: session.user,
                    expires: session.expires,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            How This Works
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>✓ You signed in using Google OAuth</li>
            <li>✓ Your session is managed by NextAuth</li>
            <li>✓ Click "Sign Out" to end your session</li>
            <li>
              ✓ Visit{" "}
              <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                /api/auth/signin
              </code>{" "}
              to manage your session
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
