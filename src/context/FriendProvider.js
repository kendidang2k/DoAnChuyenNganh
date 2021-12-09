import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const FriendsContext = createContext();

export default function FriendsProvider({ children }) {

    const { user } = useContext(AuthContext);
    const friendsCondition = useMemo(() => {
        return {
            fieldName: 'friends',
            operator: 'array-contains',
            compareValue: user.uid,
        }
    }, [user.uid])

    const friends = useFirestore('user', friendsCondition)

    return (
        <FriendsContext.Provider value={friends}>
            {children}
        </FriendsContext.Provider>
    )
}
