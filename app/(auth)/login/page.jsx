'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axiosInstance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Page = ({ params, searchParams }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = searchParams.callbackUrl;

  //    validation
  const validateForm = ({ email, password }) => {
    const errors = {};

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Enter a valid email address';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      errors.password =
        'Password must be at least 8 characters long and include a letter, a number, and a symbol';
    }

    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = validateForm({ email, password });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        '/auth/login',
        { email, password },
        { withCredentials: true }
      );

      sessionStorage.setItem('access_token', res.data.accessToken);

      toast.success('Login successful!');
      window.location.href = callbackUrl || '/';
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const URL =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:8000/api/v1/auth/google?redirect_uri=http://localhost:3000`
        : `https://backend.ladlifoundation.org/api/v1/auth/google?redirect_uri=https://socialinternship.org`;

    if (callbackUrl) sessionStorage.setItem('callback', callbackUrl);
    window.location.href = URL;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <h2 className="text-2xl font-semibold text-center">Sign In</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Please Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="outline"
                className="w-full bg-transparent"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
