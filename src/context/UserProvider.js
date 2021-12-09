import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import useFirestore from '../hooks/useFirestore';

export const UserContext = createContext();

export default function UserProvider({ children }) {


    const users = useFirestore('user', "")
    // console.log("receiver:", users);

    return (
        <UserContext.Provider value={users}>
            {children}
        </UserContext.Provider>
    )
}
