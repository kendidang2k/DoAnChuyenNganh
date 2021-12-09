import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AiOutlineClose, AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, query, updateDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';
import './modalNotification.css'
import { AuthContext } from '../../context/AuthProvider';
import { remove } from '@firebase/database';

export default function ModalNotification(props) {

    const currentUser = React.useContext(AuthContext);
    const notiArrayData = props.data;
    const collectionRef = query(collection(db, "user"));
    const [userArray, setUserArray] = React.useState([])


    React.useEffect(() => {
        let tempData = [];
        notiArrayData.forEach(element => {
            onSnapshot(collectionRef, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().uid === element) {
                        const { displayName, uid } = doc.data();
                        tempData.push({ displayName, uid });
                    }
                })
            })
        });
        console.log(tempData);
        setUserArray(tempData);
    }, [props.data])

    const handleAcceptRequest = (userID) => {
        let receiverID;
        let currentUID;
        onSnapshot(collectionRef, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().uid === userID) {
                    receiverID = doc.id;
                }
                else if (doc.data().uid === currentUser.user.uid) {
                    currentUID = doc.id;
                }
            })
            const otherUserRef = doc(db, "user", receiverID);
            updateDoc(otherUserRef, {
                friends: arrayUnion(currentUser.user.uid)
            });
            const currentUserRef = doc(db, "user", currentUID);
            updateDoc(currentUserRef, {
                notifications: arrayRemove(userID),
                friends: arrayUnion(userID)
            });
        })
    }

    return (
        <Box sx={{ position: 'absolute', top: '0' }}>
            <Modal
                open={props.status}
                onClose={props.handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={12} sx={{ position: 'absolute', top: '0', left: "0", width: '20vw', backgroundColor: "#363636", outline: 'none' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Notification
                    </Typography>
                    {userArray && userArray.map((item, index) => {
                        return (
                            <Box key={index} sx={{ display: 'block', height: '50px' }}>
                                <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                                    <Box>{item.displayName}</Box>
                                    <Box sx={{ marginLeft: 'auto', }}>
                                        <AiFillCheckCircle className='notiButton' onClick={() => handleAcceptRequest(item.uid)} />
                                        <AiFillCloseCircle className='notiButton' />
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Modal>
        </Box>
    );
}
