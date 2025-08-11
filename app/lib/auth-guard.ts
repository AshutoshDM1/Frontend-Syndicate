import { useSession } from './auth-client';

// Type for session data from better-auth
export interface SessionData {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role?: string;
      image?: string;
    };
    session: {
      id: string;
      userId: string;
      expiresAt: Date;
    };
  } | null;
  isPending: boolean;
  error: Error | null;
}

// Hook to check if user is authenticated
export function useRequireAuth() {
  return useSession();
}

// Hook to check if user has required role
export function useRequireRole(allowedRoles: string[]) {
  const session: any = useSession();

  const hasRole = session.data?.user?.role && allowedRoles.includes(session.data.user.role);

  return {
    ...session,
    hasRole,
    isAuthorized: !!session.data && hasRole,
  };
}

// Hook to check if route should be guest-only
export function useRequireGuest() {
  const session = useSession();

  return {
    ...session,
    isGuest: !session.data,
  };
}
