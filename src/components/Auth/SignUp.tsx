import React from 'react';

function SignUp({
    updateFormState,
    signUp,
    updateFormType,
}: {
    updateFormState: (event: any) => void;
    signUp: () => void;
    updateFormType: (formType: string) => void;
}) {
    return (
        <div>
            <input
                name="username"
                onChange={(e) => {
                    e.persist();
                    updateFormState(e);
                }}
                className='text-text-light dark:text-text-dark text-subbody bg-blue-300'
                placeholder="username"
            />
            <input
                type="password"
                name="password"
                onChange={(e) => {
                    e.persist();
                    updateFormState(e);
                }}
                placeholder="password"
            />
            <input
                name="email"
                onChange={(e) => {
                    e.persist();
                    updateFormState(e);
                }}
                placeholder="email"
            />

            <button onClick={signUp}>Sign Up</button>

            <p>
                Already have an account?{' '}
                <span onClick={() => updateFormType('signIn')}>Sign In</span>
            </p>
        </div>
    );
}

export default SignUp;
