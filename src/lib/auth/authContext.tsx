import { signInWithGoogle, onAuthStateChanged, signOut, signIn, signUp } from "@/services/firebase/authService";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  loading: Boolean;
  loginWithGoogle: () => Promise<FirebaseAuthTypes.User | null>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<FirebaseAuthTypes.User | null>;
  signUpWithEmailAndPassword: (email: string, password: string, displayName: string) => Promise<FirebaseAuthTypes.User | null>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
      // Listen for auth state changes
      const unsubscribe = onAuthStateChanged((currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
  
      // Clean up subscription on unmount
      return () => unsubscribe();
    }, []);
  
    const loginWithGoogle = async () => {
        try {
            const user = await signInWithGoogle();
            return user;
        }
        catch (error) {
            console.error("authProvider/" + error);
        }
        return null;
    };

    const loginWithEmailAndPassword = async (email: string, password: string) => { 
        try {
            const user = await signIn(email, password);
            return user;
        }
        catch (error) {
            console.error("authProvider/" + error);
        }
        return null
    };

    const signUpWithEmailAndPassword = async (email: string, password: string, displayName: string) => {
        try {
            const user = await signUp(email, password, displayName);
            return user;
        }
        catch (error) {
            console.error("authProvider/" + error);
        }
        return null;
    };

    const logout = async () => {
      try {
          await signOut();
      }
      catch (error) {
          console.error("authProvider/" + error);
          return false;
      }
      return true;
    };
  
    return (
        <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithEmailAndPassword, signUpWithEmailAndPassword, logout  }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
