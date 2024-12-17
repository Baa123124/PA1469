import { signInWithGoogle, onAuthStateChanged } from "@/services/firebase/authService";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  loginWithGoogle: () => Promise<FirebaseAuthTypes.User | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
      // Listen for auth state changes
      const unsubscribe = onAuthStateChanged((currentUser) => {
        setUser(currentUser);
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
  
    return (
        <AuthContext.Provider value={{ user, loginWithGoogle }}>
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
