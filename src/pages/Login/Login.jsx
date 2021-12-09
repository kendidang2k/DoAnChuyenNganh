import React, { useContext, useEffect, useState } from 'react';
import { Typography, Button, Grid, TextField, Box } from '@mui/material'
// import { auth } from '../../firebase/config';
import { FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { auth, db } from '../../firebase/config';
import { useHistory } from 'react-router-dom';
import { addDoc, collection, doc, setDoc } from '@firebase/firestore';
import { addDocument } from '../../firebase/service';
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth'
import TextInput from '../../components/TextInput';
import { FormatError } from '../../notification/FormatError';
import AlertDialog from '../../components/AlertDialog';
import { AuthContext } from '../../context/AuthProvider';

const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

export default function Login() {

    const history = useHistory();

    const handleFbLogin = async () => {
        try {
            const data = await signInWithPopup(auth, fbProvider)
            if (data.user.metadata.creationTime === data.user.metadata.lastSignInTime) {
                addDocument("user", {
                    displayName: data.user.displayName,
                    photoURL: data.user.photoURL,
                    uid: data.user.uid,
                    friends: [data.user.uid],
                    notifications: []
                })
            }
            history.push('/');
        } catch (e) {
            console.log(e.message);
        }
    }

    const handleGgLogin = async () => {
        try {
            const data = await signInWithPopup(auth, ggProvider)
            if (data.user.metadata.creationTime === data.user.metadata.lastSignInTime) {
                addDocument("user", {
                    displayName: data.user.displayName,
                    photoURL: data.user.photoURL,
                    uid: data.user.uid,
                    friends: [data.user.uid],
                    notifications: []
                })
            }
            history.push('/');
        } catch (e) {
            console.log(e.message);
        }
    }
    const toSignUp = () => {
        history.push('/signup');
    }

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const userContext = useContext(AuthContext)

    const [errorMess, setErrorMess] = useState('')

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    actions.setSubmitting(false);
                    signInWithEmailAndPassword(auth, values.email, values.password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            console.log("test user: ", user);
                            userContext.setUser(user)
                            history.push("/")
                        })
                        .catch((error) => {
                            // const errorCode = error.code;
                            const errorMessage = error.message;
                            var newE = FormatError(errorMessage)
                            setErrorMess(newE);
                            setOpen(true)
                        });
                }, 1000);
            }}
        >
            {
                formik => (
                    <Grid container textAlign='center' justifyContent='center' alignItems='center' height='100vh'>
                        <Grid item={true} xs={12} alignItems='center' justifyContent='center'>
                            <Box sx={{ marginBottom: '40px' }}>
                                <Typography variant='h4'>Login Form</Typography>
                            </Box>
                            <Form onSubmit={formik.handleSubmit}>
                                <TextInput sx={{ width: { xs: '80%', sm: '50%', md: '60%', lg: '50%' } }} label="Email" id='email' name='email' type='email' />
                                <Box sx={{ marginTop: '10px' }}>
                                    <TextInput sx={{ width: { xs: '80%', sm: '50%', md: '60%', lg: '50%' } }} label="Password" id='password' name='password'
                                        InputProps={true} />
                                </Box>
                                <Button type='submit'>Sign in</Button>
                            </Form>
                            <Button sx={{ margin: '10px' }} variant='contained' onClick={handleFbLogin}>Login with FB</Button>
                            <Button sx={{ margin: '10px' }} variant='outlined' onClick={handleGgLogin}>Login with GG</Button>
                            <Button sx={{ display: 'block', margin: 'auto' }} onClick={toSignUp}>
                                Sign up
                            </Button>
                        </Grid>
                        <AlertDialog status={open} handleClickClose={handleClose} error={errorMess} title={'Sign in notification !!'} successNoti={"Sign in successfully !!"}></AlertDialog>
                    </Grid>
                )
            }
        </Formik>
    );
};