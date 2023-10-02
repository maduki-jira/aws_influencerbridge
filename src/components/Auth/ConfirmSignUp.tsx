import React from 'react';

export default function ConfirmSignUp({confirmSignUp, updateFormState}: {confirmSignUp: any, updateFormState: any}) {
    return (
        <div>
            <input
                name="confirmationCode"
                placeholder="Confirmation Code"
                onChange={(e) => {
                    e.persist();
                    updateFormState(e);
                }}
            />
            <button onClick={confirmSignUp}>
                Confirm Sign Up
                <button />
            </button>
        </div>
    );
}
