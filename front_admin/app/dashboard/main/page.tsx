'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${document.cookie.replace(
          /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        )}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push('/dashboard/signin');
        } else {
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        router.push('/dashboard/signin');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Redirecting...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={() => {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          router.push('/dashboard/signin');
        }}
      >
        Logout
      </button>
    </div>
  );
}
