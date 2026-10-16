'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Chat from '@/components/dashboard/ai-chat';

export default function AiChat() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  function getAuthToken() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  }

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = getAuthToken();
        if (!token) return router.push('/dashboard/signin');

        const userRes = await fetch('http://127.0.0.1:8000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!userRes.ok) return router.push('/dashboard/signin');

        const userData = await userRes.json();
        setUser(userData.user);

        const userDetailsRes = await fetch('http://127.0.0.1:8000/api/auth/user-details', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (userDetailsRes.ok) {
          const userDetailsData = await userDetailsRes.json();
          setUserDetails(userDetailsData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  if (!user) return null;

  return <Chat user={user} userDetails={userDetails} />;
}
