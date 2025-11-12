// /lib/axiosInstance.ts
import axios from 'axios';
import { getAccessToken, setAccessToken } from './authHelpers';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

instance.interceptors.request.use(
    async config => {
        // Skip auth header for specific requests
        if (config.headers?.['X-Auth-Check'] || config.headers?.['X-Logout-Request']) {
            return config;
        }

        const token = getAccessToken();

        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    err => Promise.reject(err)
);

instance.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config;

        // Skip interceptor for specific requests
        if (originalRequest.headers?.['X-Auth-Check'] || originalRequest.headers?.['X-Logout-Request']) {
            return Promise.reject(err);
        }

        if (err.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers.Authorization = 'Bearer ' + token;
                        return instance(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/refresh-token`,
                    {},
                    { withCredentials: true }
                );
                const newToken = res.data.accessToken;
                setAccessToken(newToken);
                sessionStorage.setItem('access_token', newToken);

                processQueue(null, newToken);
                originalRequest.headers.Authorization = 'Bearer ' + newToken;
                return instance(originalRequest);
            } catch (err) {
                console.log('Token refresh failed:', err);
                processQueue(err, null);
                // Clear invalid token
                setAccessToken(null);
                sessionStorage.removeItem('access_token');
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(err);
    }
);

export default instance;