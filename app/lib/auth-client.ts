import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "http://localhost:2020", // Updated to match your backend URL
    client: {
        signIn: {
            email: {
                callbackURL: '/dashboard',
            },
            
            social: {
                callbackURL: '/dashboard',
                redirectAfterSignIn: '/dashboard',
                providers: {
                    google: {
                        redirectAfterSignIn: '/dashboard',
                        callbackURL: '/dashboard',
                    }
                }
            },
        },
    },
    trustedOrigins: ['http://localhost:2020', 'https://frontend-syndicate.vercel.app', 'https://backend-syndicate.onrender.com'],
})

export const { signIn, signUp, useSession } = authClient;