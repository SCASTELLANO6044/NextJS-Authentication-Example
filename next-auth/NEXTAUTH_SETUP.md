# NextAuth Google OAuth Login Example

This is a Next.js application demonstrating authentication using NextAuth v4 with Google OAuth.

## Features

- ✅ Google OAuth sign-in integration
- ✅ Protected pages with session management
- ✅ User profile display
- ✅ Sign-out functionality
- ✅ Responsive design with dark mode support

## Prerequisites

- Node.js 18+ and npm/yarn
- A Google OAuth application (Client ID and Secret)

## Setup Instructions

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)
5. Copy your **Client ID** and **Client Secret**

### 2. Set Up Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-client-id-from-google
GOOGLE_CLIENT_SECRET=your-client-secret-from-google
NEXTAUTH_URL=http://localhost:3000
```

**To generate a secure NEXTAUTH_SECRET**, run:

```bash
openssl rand -hex 32
```

### 3. Install Dependencies

```bash
npm install
# or
yarn install
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
app/
├── api/
│   └── auth/
│       ├── [...nextauth]/
│       │   └── route.ts       # NextAuth configuration
│       └── logout/
│           └── route.ts        # Sign-out handler
├── login/
│   └── page.tsx               # Login page with Google button
├── page.tsx                   # Home page (shows user info when signed in)
├── layout.tsx                 # Root layout with SessionProvider
└── globals.css                # Global styles
```

## How It Works

1. **User clicks "Sign in with Google"** → `/login` page
2. **NextAuth redirects to Google** → User grants permission
3. **Google redirects back** → `/api/auth/callback/google`
4. **Session is created** → User is redirected to home page
5. **Home page displays** → User info from Google OAuth

## Key Files

### [app/api/auth/[...nextauth]/route.ts](app/api/auth/[...nextauth]/route.ts)
NextAuth configuration with Google provider setup.

### [app/login/page.tsx](app/login/page.tsx)
Beautiful login page with Google OAuth button.

### [app/page.tsx](app/page.tsx)
Home page showing user profile and session information when authenticated.

### [app/layout.tsx](app/layout.tsx)
Root layout wrapping the app with SessionProvider for session management.

## Protected Pages

To create a protected page that requires authentication:

```tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <button onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}>
        Sign Out
      </button>
    </div>
  );
}
```

## Production Deployment

1. Update `NEXTAUTH_URL` to your production domain
2. Add your production redirect URI to Google Console
3. Use a strong, random `NEXTAUTH_SECRET`
4. Deploy your app (Vercel, AWS, etc.)

## Troubleshooting

### "Redirect URI mismatch" error
- Make sure your callback URL in Google Console exactly matches your app's URL
- For localhost: `http://localhost:3000/api/auth/callback/google`
- For production: `https://yourdomain.com/api/auth/callback/google`

### Session not persisting
- Ensure `NEXTAUTH_SECRET` is set
- Check that SessionProvider is in your root layout

### Google button not working
- Verify Client ID and Secret are correct
- Check browser console for errors

## Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Setup](https://next-auth.js.org/providers/google)
- [Next.js Documentation](https://nextjs.org/docs)
