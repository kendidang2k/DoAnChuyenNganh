import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AppContext } from '../../context/AppProvider';
import { TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import { addDocument } from '../../firebase/service';
import { AuthContext } from '../../context/AuthProvider';

export default function ModalAddRoom(props) {

  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
  const handleClose = () => setIsAddRoomVisible(false);

  return (

    <Box sx={{}}>
      <Formik
        initialValues={{
          roomName: '',
          roomDes: ''
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            console.log('value', values);
            addDocument('rooms', { name: values.roomName, description: values.roomDes, members: [props.user.uid] })
            setIsAddRoomVisible(false)
          }, 1000);
        }}
      >
        {
          formik => (
            <Modal
              open={isAddRoomVisible}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={12} sx={{ width: '500px', height: '300px', padding: '15px 30px', backgroundColor: '#fff', margin: '80px auto', position: 'relative', borderRadius: '20px' }}>
                <Button onClick={() => setIsAddRoomVisible(false)} sx={{ position: 'absolute', top: '0', right: '0' }}>x</Button>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginTop: '30px' }}>
                  Create Message
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: '20px' }}>
                  Enter the information below
                </Typography>
                <Form onSubmit={formik.handleSubmit} className='cover-form'>
                  <TextField id="outlined-basic"
                    onChange={formik.handleChange}
                    value={formik.values.name} name='roomName' label="Room Name" variant="outlined" sx={{ display: 'block', marginBottom: '20px' }} />
                  <TextField id="outlined-basic"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    name='roomDes' label="Room Description" variant="outlined" />
                  <Button type='submit' sx={{ position: 'absolute', bottom: '10px', right: '20px' }} >Create</Button>
                </Form>
              </Box>
            </Modal>
          )
        }
      </Formik>

    </Box >
  );
}


