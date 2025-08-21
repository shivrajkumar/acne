"use client"
import React, {
    createContext,
    useState,
    useContext,
    useCallback,
    useEffect
} from 'react';
import { useRouter } from 'next/navigation';
import { TokenManager, logoutRequest } from '@/utils/tokenManager';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessToken = TokenManager.getAccessToken();
        const storedUser = localStorage.getItem('user');

        if (accessToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Failed to parse stored user', error);
            }
        }
    }, []);

    // Login method
    const login = useCallback((userData, accessToken, accessTokenExpiry) => {
        setUser(userData);

        TokenManager.setTokens(accessToken, accessTokenExpiry);

        localStorage.setItem('user', JSON.stringify(userData));
    }, []);

    // Logout method
    const logout = useCallback(async () => {
        try {
            const logoutResponse = await logoutRequest();

            if (!logoutResponse.hasError) {
                setUser(null);

                TokenManager.clearTokens();
                localStorage.removeItem('user');

                router.push('/login');
            } else {
                console.error('Logout failed', logoutResponse);
            }
        } catch (error) {
            console.error('Logout error', error);

            setUser(null);
            TokenManager.clearTokens();
            localStorage.removeItem('user');
            router.push('/login');
        }
    }, [router]);

    const authContextValue = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};