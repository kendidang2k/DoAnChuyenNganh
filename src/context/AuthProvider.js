import React, { Children, createContext, useState } from 'react'
import { auth } from '../firebase/config'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, photoURL, uid } = user;
                setUser({ displayName, photoURL, uid });
                setLoading(false);
                return;
            }
            history.push("/login")
            setLoading(false);
        })
        return () => {
            unsub();
        }
    }, [])


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {loading ? <CircularProgress /> : children}
        </AuthContext.Provider>
    )
}
