import React, { useState } from 'react'
import { Button, Dialog, FormControl, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { auth, db } from '../../firebase/config'
import { addDocument } from '../../firebase/service'
import TextInput from '../../components/TextInput'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { validateArgCount } from '@firebase/util'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from '@firebase/auth'
import { useHistory } from 'react-router'
import AlertDialog from '../../components/AlertDialog'
import { BiShow } from "react-icons/bi";
import { FormatError } from '../../notification/FormatError'
import AuthProvider from '../../context/AuthProvider'


export default function SignUp() {

    const history = useHistory();

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const [errorMess, setErrorMess] = useState('')

    const validate = Yup.object({
        email: Yup.string()
            .email("Email is invalid")
            .required("Email must be required !"),
        fullName: Yup.string()
            .max(50, "Full Name must be less than 50 characters")
            .required("Full Name must be required !"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password must be required !"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match !')
            .required("Confirm Password must be required !")
    })


    const friends = [];
    // const [user, setUser] = useState({});

    return (
        <Formik
            initialValues={{
                email: '',
                fullName: '',
                password: '',
                confirmPassword: ''
            }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    actions.setSubmitting(false);
                    createUserWithEmailAndPassword(auth, values.email, values.password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            addDocument("user", {
                                displayName: values.fullName,
                                photoURL: user.photoURL,
                                uid: user.uid,
                                friends: [user.uid],
                                notifications: []
                            })
                            updateProfile(auth.currentUser, {
                                displayName: values.fullName
                            }).catch((error) => {
                                console.log(error);
                            });
                            setErrorMess("")
                            setOpen(true)
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            var error = FormatError(errorMessage)
                            setErrorMess(error)
                            setOpen(true)
                        });
                }, 1000);
            }}
            validationSchema={validate}
        >
            {
                formik => (
                    <Grid container height='100vh' sx={{ backgroundImage: '' }}>
                        <Grid item={true} sx={{ display: { xs: 'none', md: 'block' } }}
                            md={6} >
                            asd
                        </Grid>
                        <Grid item={true} xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ width: '100%', textAlign: 'center' }}>
                                <Box className='Sign-up' alignItems='center' sx={{ position: 'relative' }}>
                                    <Box sx={{ margin: '10px 0' }}>
                                        <Typography variant='h2'>Sign Up</Typography>
                                    </Box>
                                    <Form onSubmit={formik.handleSubmit} className='cover-form'>
                                        <TextInput id='email' label='Email' name='email' type='text' />
                                        <Box sx={{ display: 'block', margin: '20px 0' }}>
                                            <TextInput label='Full Name' name='fullName' type='text' />
                                        </Box>
                                        <Box sx={{ display: 'block', margin: '20px 0' }}>
                                            <TextInput label='Password' name='password'
                                                InputProps={true} />
                                        </Box>
                                        <TextInput label='Confirm Password' name='confirmPassword'
                                            InputProps={true} />
                                        <Box sx={{ margin: '15px 0' }}>
                                            <Button sx={{ margin: '15px' }} type='submit' >Sign up</Button>
                                            <Button sx={{ margin: '15px' }} onClick={() => {
                                                history.push('/login')
                                            }}>Sign in</Button>
                                        </Box>

                                    </Form>
                                </Box>
                            </Box>
                        </Grid>
                        <AlertDialog status={open} handleClickClose={handleClose} error={errorMess} title={"Sign up notification !"} successNoti={"Sign Up successfully !! Back to login page"}></AlertDialog>
                    </Grid>
                )
            }
        </Formik>
    )
}
