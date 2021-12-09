import { Autocomplete, Avatar, Input, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { FriendsContext } from '../context/FriendProvider';
import './friendsList.css'
import { BsSearch } from "react-icons/bs";


export default function FriendList() {
    const friends = useContext(FriendsContext);
    const [nameFilter, setNameFilter] = React.useState('')


    const handleChangeInput = (e) => {
        setNameFilter(e.target.value);
    }

    return (
        <Box className='cover-friends-list'>
            {/* <Input placeholder='search' sx={{width :'100%',margin: '5px 0',border: 'none', outline: 'none'}}></Input> */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', padding: '5px' }}>
                <BsSearch className='search-icon' />
                <TextField className='search-input' sx={{ width: '100%', marginLeft: '10px', color: '#fff' }} id="input-with-sx" label="Search" variant="standard" onChange={(e) => handleChangeInput(e)} />
            </Box>
            {
                friends && friends.filter(friendItem => friendItem.displayName.includes(nameFilter)).map((friendItem, index) => {
                    return (
                        <Box className="cover-friend-item" key={index} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', p: 1, transition: '.5s ease-in-out', borderRadius: '10px' }}>
                            <Avatar src={friendItem.photoURL} />
                            <Typography sx={{ marginLeft: '10px', color: '#fff' }}>{friendItem.displayName}</Typography>
                        </Box>
                    )
                })
            }
        </Box>
    )
}
