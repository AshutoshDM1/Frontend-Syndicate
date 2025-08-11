import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useSession } from '~/lib/auth-client';
import { toast } from 'sonner';
import { Role } from '~/types/user.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  fallbackPath?: string;
  requireGuest?: boolean;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  fallbackPath = '/login',
  requireGuest = false,
}: ProtectedRouteProps) {
  const { data: session, isPending } = useSession();
  console.log(session);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isPending) return; // Wait for session to load

    // If route requires guest (no authentication) but user is logged in
    if (requireGuest && session) {
      navigate('/dashboard');
      return;
    }

    // If route requires authentication but user is not logged in
    if (!requireGuest && !session) {
      const currentPath = location.pathname + location.search;
      const loginUrl = `/login?redirect=${encodeURIComponent(currentPath)}`;
      navigate(loginUrl);
      toast.error('Please login to continue');
      return;
    }

    // If route requires specific roles but user doesn't have them
    if (!requireGuest && session && allowedRoles && allowedRoles.length > 0) {
      const user = session.user as any;
      const userRole = user?.role;
      if (!userRole || !allowedRoles.includes(userRole)) {
        navigate('/dashboard');
        toast.error('You do not have permission to access this page');
        return;
      }
    }
  }, [session, isPending, navigate, allowedRoles, fallbackPath, requireGuest, location]);

  // Show loading while checking authentication
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // For guest routes, don't render if user is authenticated (will redirect)
  if (requireGuest && session) {
    return null;
  }

  // For protected routes, don't render if user is not authenticated (will redirect)
  if (!requireGuest && !session) {
    return null;
  }

  // For role-based routes, don't render if user doesn't have permission (will redirect)
  if (!requireGuest && session && allowedRoles && allowedRoles.length > 0) {
    const user = session.user as any;
    const userRole = user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return null;
    }
  }

  return <>{children}</>;
}

// Higher-order component for easier usage
export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, 'children'>
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Specific components for common use cases
export function AuthenticatedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  return <ProtectedRoute allowedRoles={allowedRoles}>{children}</ProtectedRoute>;
}

export function GuestRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute requireGuest>{children}</ProtectedRoute>;
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={[Role.ADMIN]}>{children}</ProtectedRoute>;
}

export function ManagerRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={[Role.ADMIN, Role.MANAGER]}>{children}</ProtectedRoute>;
}

export function OrderManagerRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.ORDER_MANAGER]}>{children}</ProtectedRoute>
  );
}
export function KitchenManagerRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.KITCHEN_MANAGER]}>{children}</ProtectedRoute>
  );
}
export function CustomerRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={[Role.ADMIN, Role.CUSTOMER]}>{children}</ProtectedRoute>;
}
