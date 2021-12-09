import React, { useContext, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AppContext } from '../../context/AppProvider';
import { FormControl, InputLabel, MenuItem, Select, TextField, Avatar, OutlinedInput } from '@mui/material';
import { Formik, Form } from 'formik';
import { addDocument } from '../../firebase/service';
import { AuthContext } from '../../context/AuthProvider';

function DebouncSelect({ fetchOptions, debounceTimeout = 500, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then(
                newOptions => {
                    setOptions(newOptions);
                    setFetching(false);
                }
            )
        }

        // return _.debounce(loadOptions, debounceTimeout)
    }, [debounceTimeout, fetchOptions])

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Member</InputLabel>
            <Select
                labelId="Member-select-label"
                id="Member-select"
                multiple
                onChange={debounceFetcher}
                input={<OutlinedInput label="Member" />}
                {...props}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        value={option}
                    >
                        <Avatar src={option.photoURL}></Avatar>
                        <Typography>{option.label}</Typography>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

async function fetchUserList() {

}

export default function ModalInvite(props) {

    const { isInviteMemberVisible, setisInviteMemberVisible } = useContext(AppContext)
    const { value, setValue } = useContext([])
    const handleClose = () => setisInviteMemberVisible(false);

    return (

        <Box sx={{}}>
            <Formik
                initialValues={{
                    roomName: '',
                    roomDes: ''
                }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        addDocument('rooms', { name: values.roomName, description: values.roomDes, members: [props.user.uid] })
                        setisInviteMemberVisible(false)
                    }, 1000);
                }}
            >
                {
                    formik => (
                        <Modal
                            open={isInviteMemberVisible}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={12} sx={{ width: '500px', height: '300px', padding: '15px 30px', backgroundColor: '#fff', margin: '80px auto', position: 'relative', borderRadius: '20px' }}>
                                <Button onClick={() => setisInviteMemberVisible(false)} sx={{ position: 'absolute', top: '0', right: '0' }}>x</Button>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginTop: '30px' }}>
                                    Invite Member
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: '20px' }}>
                                    Enter the information below
                                </Typography>
                                <Form onSubmit={formik.handleSubmit} className='cover-form'>
                                    <DebouncSelect
                                        mode='multiple'
                                        label='Name'
                                        value={value}
                                        fetchOptions={fetchUserList}
                                        onChange={newValue => setValue(newValue)}
                                    />
                                </Form>
                            </Box>
                        </Modal>
                    )
                }
            </Formik>

        </Box >
    );
}


