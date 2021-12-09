import React, { useContext, useState } from 'react';
import { Button, Grid, Typography, Box } from '@mui/material';
import { auth, db } from '../../firebase/config';
import { AuthContext } from '../../context/AuthProvider';
import { Avatar } from '@mui/material';
import RoomList from '../../components/RoomList';
import FriendsManager from '../../components/FriendsManager';
import { BsPlusLg } from "react-icons/bs";
import './chatUI.css';
import ModalAddRoom from '../../components/modal/ModalAddRoom';
import Notifications from '../../components/Notifications';
import { AppContext } from '../../context/AppProvider';
import ChatBox from '../../components/ChatBox/ChatBox';
import ModalInvite from '../../components/modal/ModalInvite';


export default function ChatUI() {

    const onSignOut = () => {
        auth.signOut();
    }

    const { setIsAddRoomVisible } = useContext(AppContext)

    const { user } = React.useContext(AuthContext);

    return (
        <div className='ChatUI'>
            <Grid container spacing={0}>
                <Grid item xs={12} md={2.5} padding={1} sx={{ position: 'relative', backgroundColor: '#1d2127', height: '100vh', overflow: 'hidden', boxShadow: 'inset 0px -100px 10px 10px #00000018' }}>
                    <Box sx={{ height: '10%' }}>
                        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', backgroundColor: '#15191c', padding: '15px', margin: '0 0 10px 0', borderRadius: '15px' }}>
                            <Box sx={{ display: 'inline-block' }}>
                                <Avatar sx={{ width: '38px', height: '38px' }} alt="asdasd" src={user?.photoURL} />
                            </Box>
                            <Typography sx={{ marginLeft: '10px', color: '#c3c3c3', textShadow: ' 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #fff, 2px 2px 2px rgba(206,89,55,0);color: #FFFFFF;' }}>{user?.displayName}</Typography>
                            <Notifications></Notifications>
                        </Box>
                    </Box>
                    <Box className='message-list' sx={{ height: '90%', overflow: 'hidden' }}>
                        <Box className="message-item" sx={{ position: 'relative', padding: '10px 5px' }}>
                            <RoomList></RoomList>
                            <Button sx={{ position: 'absolute', left: '20px', bottom: '0' }} onClick={onSignOut}>Sign out</Button>
                        </Box>
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: '5%', right: '15px' }}>
                        <Button className='add-new-mess' onClick={() => setIsAddRoomVisible(true)} sx={{ minWidth: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#1970bd', color: '#fff' }}>
                            <BsPlusLg></BsPlusLg>
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={7} sx={{ position: 'relative', backgroundColor: '#15191c', height: '100vh', overflow: 'hidden' }}>
                    <ChatBox></ChatBox>
                </Grid>
                <Grid item xs={12} md={2.5} sx={{ position: 'relative', backgroundColor: '#1d2127', height: '100vh', overflow: 'hidden' }}>
                    <FriendsManager sx={{ padding: "0" }}></FriendsManager>
                </Grid>
                <ModalAddRoom user={user} />
                {/* <ModalInvite /> */}
            </Grid>
        </div>
    )
}
