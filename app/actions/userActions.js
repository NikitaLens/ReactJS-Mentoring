export const LOG_IN = 'LOG_IN';
export const SIGN_IN = 'SIGN_IN';

export const logIn = (user) => ({
    type: LOG_IN,
    user
});

export const signUp = (user) => ({
    type: SIGN_IN,
    user
});
