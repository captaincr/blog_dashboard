'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from './button';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logoutHandler, user } = useAuth();

  return (
    <header>
      {isAuthenticated && (
        <nav className="container mx-auto flex justify-between items-center">
          <ul className="flex justify-center py-5 gap-5 font-bold">
            {user.role === 'admin' ||
              (user.role === 'manager' && (
                <li>
                  <Link href="/blog/all-blogs">All Blogs</Link>
                </li>
              ))}
            {user.role === 'blogger' && (
              <li>
                <Link href="/blog/my-blogs">My Blogs</Link>
              </li>
            )}
            <li>
              <Link href="/blog/create-blog">Post a blog</Link>
            </li>
          </ul>
          <Button variant="destructive" onClick={logoutHandler}>
            Logout
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
