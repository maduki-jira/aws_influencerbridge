'use client';
import { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from '@/aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { user } from '@/Types/user';
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

    async function checkUser() {
        try {
            const data = await Auth.currentUserPoolUser();
            const userInfo = { username: data.username, ...data.attributes };
            setUser(userInfo);
        } catch (err) {
            console.log('error: ', err);
        }
    }

    if (user) {
        router.push('/Dashboard');
    } else {
        router.push('/Auth');
    }
}

export default Profile;
