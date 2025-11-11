// authHelpers
let token = null;

export const setAccessToken = (t) => {
    token = t;
    sessionStorage.setItem('access_token', t);
};

export const getAccessToken = () => {
    const token = sessionStorage.getItem('access_token')
    return token
};

// Remove the refreshToken function since interceptor handles it