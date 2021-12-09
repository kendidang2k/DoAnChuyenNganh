import { addDoc, collection } from '@firebase/firestore'
import React from 'react'
import { db } from './config'
import firebase from 'firebase/compat'

export const addDocument = (collections, data) => {
    const query = addDoc(collection(db, collections), {
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}



