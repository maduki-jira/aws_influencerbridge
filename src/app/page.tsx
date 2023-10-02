'use client';
import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from '@/aws-exports';
import '@aws-amplify/ui-react/styles.css';
import Form from './Auth/Form';
import React, { useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { user } from '@/Types/user';
import DarkLight from '@/components/DarkLight';

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
            <div className=''>
                <DarkLight />
                <span className="text-highlight-light dark:text-highlight-dark text-header bg-blue-300 ">
                    Profile
                </span>
                <span className="text-primary-light dark:text-primary-dark text-subheader bg-blue-300 ">
                    Username: {user.username}
                </span>
                <span className="text-background-light dark:text-background-dark text-body bg-blue-300">
                    Email: {user.email}
                </span>
                <button
                    onClick={signOut}
                    className="text-text-light dark:text-text-dark text-subbody bg-blue-300 "
                >
                    Sign Out
                </button>
            </div>
        );
    }

    return <Form setUser={setUser} />;
}

export default Profile;
