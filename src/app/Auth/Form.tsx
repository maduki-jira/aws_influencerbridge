import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordSubmit from './ForgotPasswordSubmit';
import {
    confirmSignUp,
    forgotPassword,
    forgotPasswordSubmit,
    signIn,
    signUp,
} from '@/utils/handleSignin';

const initialFormState = {
    username: '',
    password: '',
    email: '',
    confirmationCode: '',
};

export default function Form({ setUser }: { setUser: any }) {
    const [formType, updateFormType] = useState('signIn');
    const [formState, updateFormState] = useState(initialFormState);

    function updateForm(event: any) {
        const newFormState = {
            ...formState,
            [event.target.name]: event.target.value,
        };
        updateFormState(newFormState);
    }

    function renderForm() {
        switch (formType) {
            case 'signUp':
                return (
                    <SignUp
                        signUp={() => signUp(formState, updateFormType)}
                        updateFormState={(e) => updateForm(e)}
                    />
                );
            case 'confirmSignUp':
                return (
                    <ConfirmSignUp
                        confirmSignUp={() =>
                            confirmSignUp(formState, updateFormType)
                        }
                        updateFormState={updateForm}
                    />
                );
            case 'signIn':
                return (
                    <SignIn
                        signIn={() => signIn(formState, setUser)}
                        updateFormState={updateForm}
                    />
                );
            case 'forgotPassword':
                return (
                    <ForgotPassword
                        forgotPassword={() =>
                            forgotPassword(formState, updateFormType)
                        }
                        updateFormState={updateForm}
                    />
                );
            case 'forgotPasswordSubmit':
                return (
                    <ForgotPasswordSubmit
                        forgotPasswordSubmit={() =>
                            forgotPasswordSubmit(formState, updateFormType)
                        }
                        updateFormState={updateForm}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <div>
            {renderForm()}
            {formType === 'signUp' && (
                <p>
                    Already have an account?{' '}
                    <span onClick={() => updateFormType('signIn')}>
                        Sign In
                    </span>
                </p>
            )}
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
