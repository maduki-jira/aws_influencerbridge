// SignUp.js
import React from 'react';

function SignUp({ updateFormState, signUp } : { updateFormState: (event: any) => void
, signUp: () => void }) {
    return (
        <div>
            <input
                name="username"
                onChange={(e) => {
                    e.persist();
                    updateFormState(e);
                }}
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
                    <span onClick={() => updateFormState('signIn')}>
                        Sign In
                    </span>
                </p>
        </div>
    );
}

export default SignUp;
