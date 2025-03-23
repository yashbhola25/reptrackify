
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { Loader2 } from 'lucide-react'; 

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  console.log('ProtectedRoute - Current path:', location.pathname);
  console.log('ProtectedRoute - User:', user);
  console.log('ProtectedRoute - isLoading:', isLoading);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute - Redirecting to auth page');
    return <Navigate to="/auth" replace />;
  }

  console.log('ProtectedRoute - Rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;
