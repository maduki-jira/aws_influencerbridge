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
        </div>
    );
}

export default SignIn;
