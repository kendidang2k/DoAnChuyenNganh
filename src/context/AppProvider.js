import React, { createContext, useContext, useMemo, useState } from 'react'
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export default function AppProvider({ children }) {

    const { user } = useContext(AuthContext);
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState('')
    const [isInviteMemberVisible, setisInviteMemberVisible] = useState(false)

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user.uid,
            orderBy: true
        }
    }, [user.uid])

    const rooms = useFirestore('rooms', roomsCondition)

    const recentRoom = useMemo(
        () => rooms.find((room) =>
            JSON.stringify(room) === selectedRoom
        )
            || {}
        ,
        [rooms, selectedRoom])


    const userCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: recentRoom.members,
        }
    }, [recentRoom.members])

    const members = useFirestore('user', userCondition)

    console.log('members', members);

    return (
        <AppContext.Provider value={{
            rooms,
            isAddRoomVisible,
            setIsAddRoomVisible,
            selectedRoom,
            setSelectedRoom,
            recentRoom,
            members,
            isInviteMemberVisible,
            setisInviteMemberVisible
        }}>
            {children}
        </AppContext.Provider>
    )
}
