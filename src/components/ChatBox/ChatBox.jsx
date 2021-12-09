import React, { useContext, useMemo } from 'react'
import { Avatar, AvatarGroup, Button, Input, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { BsPlusLg } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import { AppContext } from '../../context/AppProvider';
import './index.css'



export default function ChatBox() {

    const { recentRoom, members } = useContext(AppContext)

    // console.log("recentRoom", recentRoom);

    return (
        <Box>
            <Box className='chat-box-title' sx={{ height: '60px' }}>
                <Box sx={{ display: 'inline', float: 'left' }}>
                    <Typography sx={{ color: '#fff' }}>
                        {recentRoom.name}
                    </Typography>
                </Box>
                <Box sx={{ float: 'right', display: 'flex' }}>
                    <AvatarGroup max={4} sx={{ width: '35px', height: '35px' }}>
                        {
                            members && members.map((member) => {
                                return (
                                    <Tooltip title={member.displayName} key={member.uid}>
                                        <Avatar src={member.photoURL} sx={{ width: '35px', height: '35px' }}></Avatar>
                                    </Tooltip>
                                )
                            })
                        }
                    </AvatarGroup>
                    <Tooltip title='Add Member'>
                        <Button sx={{ display: 'flex', backgroundColor: '#7631e6', color: '#fff', alignItems: 'center', justifyContent: 'center', minWidth: '40px', height: '40px', borderRadius: '50%', marginLeft: '5px' }}>
                            <BsPlusLg></BsPlusLg>
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
            <Box className='chat-box-content' sx={{ display: 'flex', alignItems: 'flex-end', padding: '20px', color: '#fff' }}>
                <Box className='cover-box-content' sx={{ height: '100%', overflowY: 'hidden' }}>
                    <Box sx={{ minHeight: '50px', marginBottom: '20px', display: 'flex' }}>
                        <Box sx={{ marginRight: '20px', display: 'flex', alignItems: 'flex-end' }}>
                            <Avatar></Avatar>
                        </Box>
                        <Box sx={{}}>
                            <Typography>Name1</Typography>
                            <Typography sx={{ width: '60%' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eveniet aliquam necessitatibus asperiores, ut optio, ratione at esse consequuntur dolorem provident ab autem sed nulla exercitationem, rerum perspiciatis facere praesentium.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ minHeight: '50px', marginBottom: '20px', display: 'flex' }}>
                        <Box sx={{ marginRight: '20px', display: 'flex', alignItems: 'flex-end' }}>
                            <Avatar></Avatar>
                        </Box>
                        <Box sx={{}}>
                            <Typography>Name1</Typography>
                            <Typography sx={{ width: '60%' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eveniet aliquam necessitatibus asperiores, ut optio, ratione at esse consequuntur dolorem provident ab autem sed nulla exercitationem, rerum perspiciatis facere praesentium.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ minHeight: '50px', marginBottom: '20px', display: 'flex' }}>
                        <Box sx={{ marginRight: '20px', display: 'flex', alignItems: 'flex-end' }}>
                            <Avatar></Avatar>
                        </Box>
                        <Box sx={{}}>
                            <Typography>Name1</Typography>
                            <Typography sx={{ width: '60%' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eveniet aliquam necessitatibus asperiores, ut optio, ratione at esse consequuntur dolorem provident ab autem sed nulla exercitationem, rerum perspiciatis facere praesentium.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ minHeight: '50px', marginBottom: '20px', display: 'flex' }}>
                        <Box sx={{ marginRight: '20px', display: 'flex', alignItems: 'flex-end' }}>
                            <Avatar></Avatar>
                        </Box>
                        <Box sx={{}}>
                            <Typography>Name1</Typography>
                            <Typography sx={{ width: '60%' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eveniet aliquam necessitatibus asperiores, ut optio, ratione at esse consequuntur dolorem provident ab autem sed nulla exercitationem, rerum perspiciatis facere praesentium.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ minHeight: '50px', marginBottom: '20px', display: 'flex' }}>
                        <Box sx={{ marginRight: '20px', display: 'flex', alignItems: 'flex-end' }}>
                            <Avatar></Avatar>
                        </Box>
                        <Box sx={{}}>
                            <Typography>Name1</Typography>
                            <Typography sx={{ width: '60%' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eveniet aliquam necessitatibus asperiores, ut optio, ratione at esse consequuntur dolorem provident ab autem sed nulla exercitationem, rerum perspiciatis facere praesentium.</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ minHeight: '50px', marginBottom: '20px', display: 'flex' }}>
                        <Box sx={{ marginRight: '20px', display: 'flex', alignItems: 'flex-end' }}>
                            <Avatar></Avatar>
                        </Box>
                        <Box sx={{}}>
                            <Typography>Name1</Typography>
                            <Typography sx={{ width: '60%' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eveniet aliquam necessitatibus asperiores, ut optio, ratione at esse consequuntur dolorem provident ab autem sed nulla exercitationem, rerum perspiciatis facere praesentium.</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ height: '100px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Input sx={{ backgroundColor: '#1d2127', width: '70%' }}></Input>
                    <Box sx={{ display: 'flex', width: '20%' }}>
                        <Button><GrGallery /></Button>
                        <Button><BiSend /></Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


