import { collection, onSnapshot, query } from '@firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { IoIosNotifications } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { db } from '../firebase/config';
import { AuthContext } from '../context/AuthProvider';
import { Box } from '@mui/system';
import ModalNotification from './modal/ModalNotification';
import { Typography } from '@mui/material';



export default function Notifications() {

    const [notificationArray, setNotificationArray] = useState([]);
    const [notificationNumber, setNotificationNumber] = useState(0);

    const [modalNotiStatus, setModalNotiStatus] = useState(false);

    const handleCloseModalNoti = () => {
        setModalNotiStatus(false);
    }

    const currentUser = useContext(AuthContext);
    const collectionRef = query(collection(db, "user"));


    let data;
    let data2 = 0;


    useEffect(() => {
        const getData = onSnapshot(collectionRef, (querySnapshot) => {
            let data1 = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().uid === currentUser.user.uid) {
                    data = doc.data().notifications;
                    // notificationArray = doc.data().notifications;
                    doc.data().notifications.forEach(element => {
                        data1.push(element)
                    });
                    const updatedArr = [...notificationArray, ...data1]
                    data2 = updatedArr.length;
                    setNotificationArray(updatedArr);
                    setNotificationNumber(data2);
                }
            })

        })
        return () => {
            getData();
        }
    }, [data])

    return (
        <Box sx={{ position: 'absolute', right: '20px', top: "30%" }}>
            <Box sx={{ position: 'relative', maxHeight: '30px' }}>
                <IoNotificationsOutline style={{ color: "#fff", fontSize: '30px', cursor: 'pointer' }} onClick={() => setModalNotiStatus(true)} />
                <Typography sx={{ position: 'absolute', top: '3px', right: '0', width: '15px', height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#fff", borderRadius: '50%', backgroundColor: '#b10000f6', fontSize: '10px' }}>{notificationNumber}</Typography>
                <ModalNotification status={modalNotiStatus} handleCloseModal={handleCloseModalNoti} data={notificationArray}></ModalNotification>
            </Box>
        </Box>
    )
}
