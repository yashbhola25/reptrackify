
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  user: any | null;
  isFirstTimeUser: boolean;
  setIsFirstTimeUser: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  user: null,
  isFirstTimeUser: true,
  setIsFirstTimeUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(() => {
    const stored = localStorage.getItem('isFirstTimeUser');
    return stored === null ? true : JSON.parse(stored);
  });
  const navigate = useNavigate();

  // Check if Supabase environment variables are missing
  const isMissingSupabaseConfig = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  useEffect(() => {
    localStorage.setItem('isFirstTimeUser', JSON.stringify(isFirstTimeUser));
  }, [isFirstTimeUser]);

  useEffect(() => {
    // If Supabase is not configured, skip authentication and set isLoading to false
    if (isMissingSupabaseConfig) {
      console.warn('AuthProvider - Skipping authentication due to missing Supabase configuration');
      setIsLoading(false);
      return;
    }

    const getSession = async () => {
      setIsLoading(true);
      console.log('AuthProvider - Getting session');
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthProvider - Session error:', error);
          toast.error('Error retrieving session: ' + error.message);
          throw error;
        }
        
        console.log('AuthProvider - Session received:', session);
        setSession(session);
        setUser(session?.user || null);
      } catch (error: any) {
        console.error('Error getting session:', error);
        toast.error('Authentication error: ' + (error.message || 'Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Only set up auth state change listener if Supabase is configured
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('AuthProvider - Auth state changed:', _event, session?.user?.id);
      setSession(session);
      setUser(session?.user || null);
      
      // If the user signed in, redirect to home
      if (_event === 'SIGNED_IN' && session) {
        toast.success('Signed in successfully!');
        navigate('/');
      }
      
      // If the user signed out, redirect to auth
      if (_event === 'SIGNED_OUT') {
        toast.info('Signed out');
        navigate('/auth');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, isMissingSupabaseConfig]);

  console.log('AuthProvider - Rendering with user:', user?.id);
  
  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        isLoading, 
        user,
        isFirstTimeUser,
        setIsFirstTimeUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
