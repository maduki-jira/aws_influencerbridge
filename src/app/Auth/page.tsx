'use client';
import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from '@/aws-exports';
import '@aws-amplify/ui-react/styles.css';
import React, { useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { user } from '@/Types/user';
import Form from '@/components/Auth/Form';
import { useRouter } from 'next/navigation';

Amplify.configure(awsconfig);

function Profile() {
    const router = useRouter();

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

    useEffect(() => {
        if (user) {
            router.push('/Dashboard');
        }
    }, [user]);

    async function checkUser() {
        try {
            const data = await Auth.currentUserPoolUser();
            const userInfo = { username: data.username, ...data.attributes };
            setUser(userInfo);
            if (userInfo){
                router.push('/Dashboard');
            }
        } catch (err) {
            console.log('error: ', err);
        }
    }
    //
    // function signOut() {
    //     Auth.signOut().catch((err) => console.log('error signing out: ', err));
    // }

    return <Form setUser={setUser} />;
}

export default Profile;
