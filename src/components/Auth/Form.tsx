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
import DarkLight from '../DarkLight';

const INITIAL_FORM_STATE = {
    username: '',
    password: '',
    email: '',
    confirmationCode: '',
};

export default function Form({ setUser }: { setUser: any }) {
    const [formType, updateFormType] = useState('signIn');
    const [formState, updateFormState] = useState(INITIAL_FORM_STATE);

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
                        updateFormType={updateFormType}
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
                        updateFormType={updateFormType}
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
        <div className="flex min-h-screen flex-1">
            <div className="bg-background-light dark:bg-background-dark flex justify-center items-center">
                {renderForm()}
            </div>

            <div className="flex min-h-full flex-1">
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

