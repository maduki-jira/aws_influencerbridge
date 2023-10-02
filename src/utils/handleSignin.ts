import { Auth } from 'aws-amplify';

async function signUp(
    {
        username,
        password,
        email,
    }: { username: string; password: string; email: string },
    updateFormType: (arg0: string) => void
) {
    try {
        await Auth.signUp({
            username,
            password,
            attributes: { email },
        });
        console.log('sign up success!');
        updateFormType('confirmSignUp');
    } catch (err) {
        console.log('error signing up..', err);
    }
}

async function confirmSignUp(
    {
        username,
        confirmationCode,
    }: { username: string; confirmationCode: string },
    updateFormType: (arg0: string) => void
) {
    try {
        await Auth.confirmSignUp(username, confirmationCode);
        updateFormType('signIn');
    } catch (err) {
        console.log('error signing up..', err);
    }
}

async function signIn(
    { username, password }: { username: string; password: string },
    setUser: any
) {
    try {
        const user = await Auth.signIn(username, password);
        const userInfo = { username: user.username, ...user.attributes };
        setUser(userInfo);
    } catch (err) {
        console.log('error signing up..', err);
    }
}

async function forgotPassword(
    { username }: { username: string },
    updateFormType: (arg0: string) => void
) {
    try {
        await Auth.forgotPassword(username);
        updateFormType('forgotPasswordSubmit');
    } catch (err) {
        console.log('error submitting username to reset password...', err);
    }
}

async function forgotPasswordSubmit(
    {
        username,
        confirmationCode,
        password,
    }: { username: string; confirmationCode: string; password: string },
    updateFormType: (arg0: string) => void
) {
    try {
        await Auth.forgotPasswordSubmit(username, confirmationCode, password);
        updateFormType('signIn');
    } catch (err) {
        console.log('error updating password... :', err);
    }
}

export { signUp, confirmSignUp, signIn, forgotPassword, forgotPasswordSubmit };
