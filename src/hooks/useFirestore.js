import { collection, doc, onSnapshot, where, query, orderBy } from '@firebase/firestore';
import React, { forwardRef, useEffect, useState } from 'react';
import { db } from '../firebase/config';

const useFirestore = (collectionName, condition) => {

    const [document, setDocument] = useState([])

    useEffect(() => {
        let collectionRef;
        if (condition.orderBy) {
            collectionRef = query(collection(db, collectionName), orderBy('createdAt'));
        } else {
            collectionRef = query(collection(db, collectionName));
        }
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return;
            }
            collectionRef = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue));
        }

        const unsubcribe = onSnapshot(collectionRef, (querySnapshot) => {
            const CoDocuments = [];
            querySnapshot.forEach((doc) => {
                CoDocuments.push(doc.data())
            })

            setDocument(CoDocuments);
        })

        return unsubcribe;

    }, [collectionName, condition])

    // console.log("document:", document);
    return document;
};

export default useFirestore;