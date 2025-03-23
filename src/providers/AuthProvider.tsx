
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

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
    const getSession = async () => {
      setIsLoading(true);
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setSession(session);
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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
