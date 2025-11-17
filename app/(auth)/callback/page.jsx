'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const AuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { setAccessToken } = useAuth();

  useEffect(() => {
    if (token) {
      setAccessToken(token);
      sessionStorage.setItem('access_token', token);
      const callback = sessionStorage.getItem('callback') || '/';
      sessionStorage.removeItem('callback');

      router.push(callback);
    } else {
      router.push('/login');
    }
  }, []);

  return <Suspense fallback={null}>{null}</Suspense>;
};

export default AuthCallbackPage;
