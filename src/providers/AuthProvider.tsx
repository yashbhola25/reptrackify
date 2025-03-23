
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

  useEffect(() => {
    localStorage.setItem('isFirstTimeUser', JSON.stringify(isFirstTimeUser));
  }, [isFirstTimeUser]);

  useEffect(() => {
    console.log('AuthProvider - Setting up auth');
    
    // First set up the auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('AuthProvider - Auth state changed:', event, session?.user?.id);
      setSession(session);
      setUser(session?.user || null);
      
      // If the user signed in, redirect to home
      if (event === 'SIGNED_IN' && session) {
        toast("Signed in successfully!");
        navigate('/');
      }
      
      // If the user signed out, redirect to auth
      if (event === 'SIGNED_OUT') {
        toast("Signed out");
        navigate('/auth');
      }
    });

    // Then get the initial session
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthProvider - Session error:', error);
          toast.error('Error retrieving session: ' + error.message);
          throw error;
        }
        
        console.log('AuthProvider - Initial session received:', session);
        setSession(session);
        setUser(session?.user || null);
      } catch (error: any) {
        console.error('Error getting session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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
