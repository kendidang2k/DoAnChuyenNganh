import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useContext, useMemo } from 'react'
import { AuthContext } from '../context/AuthProvider'
import useFirestore from '../hooks/useFirestore'
import { BsDot } from "react-icons/bs";
import { AppContext } from '../context/AppProvider';
import { collection, onSnapshot, query } from '@firebase/firestore';
import { db } from '../firebase/config';


export default function RoomList() {

    const { user } = useContext(AuthContext);
    const { rooms, setSelectedRoom } = useContext(AppContext);
    
    return (
        <Box sx={{ width: '100%', padding: '5px 5px', }}>
            {
                rooms && rooms.map((room, index) => {
                    return (
                        <Box onClick={() => { setSelectedRoom(JSON.stringify(room)) }} key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <Box sx={{ display: 'inline-block' }}>
                                <Avatar src={user.photoURL} />
                            </Box>
                            <Box sx={{ width: '60%', marginLeft: '15px' }}>
                                <Typography sx={{ color: '#fff', fontSize: '14px', }}>{room.name}</Typography>
                                <Typography sx={{ color: '#fff', fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{room.description}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignSelf: 'flex-end', marginLeft: '20px' }}>
                                <BsDot style={{ color: '#e3f2fd' }} />
                                <Typography sx={{ float: 'right', fontSize: '9px', color: '#e3f2fd' }}>10m</Typography>
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
    );
}
