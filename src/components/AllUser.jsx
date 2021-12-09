import { Autocomplete, Avatar, Button, Input, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import './friendsList.css'
import { BsSearch } from "react-icons/bs";
import { UserContext } from '../context/UserProvider';
import { AuthContext } from '../context/AuthProvider';
import { arrayUnion, getDoc, onSnapshot, setDoc } from '@firebase/firestore';
import { updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase/config';
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { async } from '@firebase/util';


export default function AllUser() {

    const receiver = useContext(UserContext);
    const currentUser = useContext(AuthContext);
    const collectionRef = query(collection(db, "user"));

    const [nameFilter, setNameFilter] = useState('')

    function handleSendRequest(receiver) {
        let receiverID;
        onSnapshot(collectionRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().uid === receiver.uid) {
                    receiverID = doc.id;
                }
            })
            const washingtonRef = doc(db, "user", receiverID);
            return updateDoc(washingtonRef, {
                notifications: arrayUnion(currentUser.user.uid)
            });
        })
    }

    const handleChangeInput = (e) => {
        setNameFilter(e.target.value);
    }

    return (
        <Box className='cover-friends-list'>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', padding: '5px' }}>
                <BsSearch className='search-icon' />
                <TextField className='search-input' sx={{ width: '100%', marginLeft: '10px', color: '#fff' }} id="input-with-sx" label="Search" variant="standard" onChange={(e) => handleChangeInput(e)} />
            </Box>
            {
                receiver && receiver.filter(receiverItem => receiverItem.displayName.includes(nameFilter)).map((item, index) => {
                    return (
                        <Box className="cover-friend-item" key={index} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', p: 1, transition: '.5s ease-in-out', borderRadius: '10px' }}>
                            <Avatar src={item.photoURL} />
                            <Typography sx={{ marginLeft: '10px', color: '#fff' }}>{item.displayName}</Typography>
                            <Button onClick={() =>
                                handleSendRequest(item)
                            }>add</Button>
                        </Box>
                    )
                })
            }
        </Box>
    )
}
