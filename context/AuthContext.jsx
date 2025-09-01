"use client"
import React, {
    createContext,
    useState,
    useContext,
    useCallback,
    useEffect
} from 'react';
import { useRouter } from 'next/navigation';
import { TokenManager } from '@/utils/tokenManager';
import Cookies from 'js-cookie';
import { fetchThumbprint } from '@/helpers/thumbmark';


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
    const login = useCallback(async (userData, accessToken, accessTokenExpiry) => {

        let thumbmark = await fetchThumbprint();
        Cookies.set("DEVICE_FP", thumbmark, {
            secure: true,
            sameSite: "Strict",
        });
        setUser(userData);
        TokenManager.setTokens(accessToken, accessTokenExpiry);
        localStorage.setItem('user', JSON.stringify(userData));
    }, []);

    // Logout method
    const logout = useCallback(async () => {

        setUser(null);
        TokenManager.clearTokens();
        localStorage.removeItem('user');
        Cookies.remove("DEVICE_FP");
        router.push('/login');
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