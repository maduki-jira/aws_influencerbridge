// Form.js
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import SignIn from './SignIn';
const initialFormState = {
    username: '',
    password: '',
    email: '',
    confirmationCode: '',
};
async function signIn({ username, password }: any, setUser: any) {
    try {
        const user = await Auth.signIn(username, password);
        const userInfo = { username: user.username, ...user.attributes };
        setUser(userInfo);
    } catch (err) {
        console.log('error signing up..', err);
    }
}

export default function Form(props) {
    const [formType, updateFormType] = useState('signIn');
    const [formState, updateFormState] = useState(initialFormState);
    function updateForm(event) {
        const newFormState = {
            ...formState,
            [event.target.name]: event.target.value,
        };
        updateFormState(newFormState);
    }

    function renderForm() {
        return (
            <SignIn
                signIn={() => signIn(formState, props.setUser)}
                updateFormState={(e) => updateForm(e)}
            />
        );
    }

    return (
        <div>
            {renderForm()}
            {formType === 'signIn' && (
                <>
                    <p>
                        Need an account?{' '}
                        <span onClick={() => updateFormType('signUp')}>
                            Sign Up
                        </span>
                    </p>
                    <p>
                        Forget your password?{' '}
                        <span onClick={() => updateFormType('forgotPassword')}>
                            Reset Password
                        </span>
                    </p>
                </>
            )}
        </div>
    );
}
