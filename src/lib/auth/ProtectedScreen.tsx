import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from './AuthContext';
import { router } from 'expo-router';

interface ProtectedScreenProps {
    children: React.ReactNode;
}

const ProtectedScreen: React.FC<ProtectedScreenProps> = ({ children }) => {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [user, loading]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={"#10b981"}/>
            </View>
        );
    }

    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={"#10b981"}/>
            </View>
        );
    }

    return <>{children}</>;
};

export default ProtectedScreen;
