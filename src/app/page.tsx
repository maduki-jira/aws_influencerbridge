'use client';
import { API } from 'aws-amplify';
import { useEffect } from 'react';

import { Amplify } from 'aws-amplify';
import awsconfig from '@/aws-exports';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Form from './Auth/Form';
import React, { useState } from 'react';
import { Auth, Hub } from 'aws-amplify';

Amplify.configure(awsconfig);

// function Home({ signOut, user }: WithAuthenticatorProps) {
//   useEffect(() => {
//     const response = API.get("goapi", "/hello", {});
//     console.log(response.then((r) => console.log(r)));
//   }, []);
//
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       {/* <h1>Hello {user?.username}</h1> */}
//       {/* <button onClick={signOut}>Sign out</button> */}
//
//       <Form />
//     </main>
//   );
// }

// Profile.js
// This component is a page that will hold the user's data when they signed up

type user = {
    username: string;
    email: string;
    phone_number: string;
};

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
// export default withAuthenticator(Home);
