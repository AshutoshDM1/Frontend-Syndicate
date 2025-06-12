import { createAuthClient } from "better-auth/react"

// Use environment variable or fallback to local development
const URL = "https://pos-syndicate.elitedev.tech"
// const URL = "https://backend-syndicate.onrender.com"
// const URL = "http://localhost:2020"

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || URL

export const authClient = createAuthClient({
    baseURL: VITE_BACKEND_URL,
    fetchOptions: {
        credentials: 'include',
    },
    client: {
        // Add session persistence configuration
        session: {
            cookieCache: true,
        }
    },
    trustedOrigins: [
        'http://localhost:2020',
        'http://localhost:5173', 
        'https://frontend-syndicate.vercel.app', 
        'https://backend-syndicate.onrender.com',
        'https://pos-syndicate.elitedev.tech'
    ],
})

export const { signIn, signUp, useSession, signOut } = authClient;