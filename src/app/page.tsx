'use client';
import { useEffect } from 'react';

import { Amplify } from 'aws-amplify';
import awsconfig from '@/aws-exports';
import '@aws-amplify/ui-react/styles.css';
import Form from './Auth/Form';
import React, { useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { user } from '@/Types/user';

Amplify.configure(awsconfig);


function Profile() {

    useEffect(() => {
        checkUser();
        Hub.listen('auth', (data) => {
            const { payload } = data;
            if (payload.event === 'signOut') {
                setUser(null);
            }
        });
    }, []);

    const [user, setUser] = useState<user | null>();

    async function checkUser() {
        try {
            const data = await Auth.currentUserPoolUser();
            const userInfo = { username: data.username, ...data.attributes };
            setUser(userInfo);
        } catch (err) {
            console.log('error: ', err);
        }
    }

    function signOut() {
        Auth.signOut().catch((err) => console.log('error signing out: ', err));
    }

    if (user) {
        return (
            <div>
                <h1>Profile</h1>
                <h2>Username: {user.username}</h2>
                <h3>Email: {user.email}</h3>
                <button onClick={signOut}>Sign Out</button>
            </div>
        );
    }

    return <Form setUser={setUser} />;
}

export default Profile;
