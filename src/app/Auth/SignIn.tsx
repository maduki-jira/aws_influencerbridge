import React from 'react';

function SignIn({
    signIn,
    updateFormState,
}: {
    signIn: any;
    updateFormState: any;
}) {
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
            <button onClick={signIn}>Sign In</button>


                    <p>
                        Need an account?{' '}
                        <span onClick={() => updateFormState('signUp')}>
                            Sign Up
                        </span>
                    </p>
                    <p>
                        Forget your password?{' '}
                        <span onClick={() => updateFormState('forgotPassword')}>
                            Reset Password
                        </span>
                    </p>
        </div>
    );
}

export default SignIn;
