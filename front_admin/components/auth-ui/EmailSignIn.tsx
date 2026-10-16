'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Define prop type with allowPassword boolean
interface EmailSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function EmailSignIn({
  allowPassword,
  redirectMethod
}: EmailSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button while the request is being handled

    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'credentials': 'include', // Enable sending cookies with the request
          'Origin': 'http://localhost:3001'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token); // تخزين التوكن
        if (router) router.push('/dashboard/main');
      } else {
        alert('Authentication failed');
      }
    } catch (error) {
      alert('Error logging in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8">
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="text-zinc-950 dark:text-white" htmlFor="email">
              Email
            </label>
            <input
              className="mr-2.5 mb-2 h-full min-h-[44px] w-full px-4 py-3 text-sm font-medium focus:outline-0 dark:placeholder:text-zinc-400"
              id="email"
              placeholder="contact@example.invalid"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <label className="text-zinc-950 dark:text-white" htmlFor="password">
              Password
            </label>
            <input
              className="mr-2.5 mb-2 h-full min-h-[44px] w-full px-4 py-3 text-sm font-medium focus:outline-0 dark:placeholder:text-zinc-400"
              id="password"
              placeholder="********"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium bg-blue-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
      {allowPassword && (
        <>
          <p>
            <Link href="/dashboard/signin/password_signin" className="font-medium text-sm dark:text-white">
              Sign in with email and password
            </Link>
          </p>
          <p>
            <Link href="/dashboard/signin/signup" className="font-medium text-sm dark:text-white">
              Don't have an account? Sign up
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
