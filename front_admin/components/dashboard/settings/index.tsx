'use client';

import DashboardLayout from '@/components/layout';
import { Button, Input, Card } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState<{ status: boolean; message: string } | null>(null);

  // دالة لاسترجاع التوكن من الكوكيز
  function getAuthToken() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  }

  // جلب بيانات المستخدم عند تحميل الصفحة
  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const token = getAuthToken();
  //       if (!token) return router.push('/dashboard/signin');

  //       const res = await fetch('http://127.0.0.1:8000/api/auth/me', {
  //         headers: { 'Authorization': `Bearer ${token}` }
  //       });

  //       if (res.ok) {
  //         const data = await res.json();
  //         setUser(data.user);
  //       } else {
  //         router.push('/dashboard/signin');
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   }

  //   fetchUser();
  // }, []);

  // تحديث الاسم
  const handleSubmitName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullName = e.currentTarget.fullName.value.trim();
    if (fullName === user?.name) {
      setIsSubmitting(false);
      return;
    }

    try {
      const token = getAuthToken();
      const res = await fetch('http://127.0.0.1:8000/api/auth/update-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ full_name: fullName })
      });

      if (res.ok) {
        setUser({ ...user, name: fullName });
      } else {
        console.error("Failed to update name");
      }
    } catch (error) {
      console.error("Error updating name:", error);
    }

    setIsSubmitting(false);
  };

  // تحديث الإيميل
  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newEmail = e.currentTarget.newEmail.value.trim();
    if (newEmail === user?.email) {
      setIsSubmitting(false);
      return;
    }

    try {
      const token = getAuthToken();
      const res = await fetch('http://127.0.0.1:8000/api/auth/update-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: newEmail })
      });

      if (res.ok) {
        setUser({ ...user, email: newEmail });
      } else {
        console.error("Failed to update email");
      }
    } catch (error) {
      console.error("Error updating email:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <DashboardLayout user={user} title="Account Settings" description="Profile settings.">
      <div className="relative mx-auto flex w-max max-w-full flex-col lg:pt-[100px] lg:pb-[100px]">
        <div className="maw-w-full mx-auto w-full flex-col justify-center">
          <Card className="mb-5 h-min flex items-center py-8 px-4">
            <Avatar className="min-h-[68px] min-w-[68px]">
              <AvatarImage src={user?.avatar_url} />
              <AvatarFallback className="text-2xl font-bold dark:text-zinc-950">
                {user?.name ? user.name[0] : user?.email[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-extrabold text-zinc-950 dark:text-white pl-4 md:text-3xl">
                {user?.name}
              </p>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 pl-4 md:text-base">
                User Role
              </p>
            </div>
          </Card>
          <Card className="mb-5 h-min pt-8 pb-6 px-6">
            <p className="text-xl font-extrabold text-zinc-950 dark:text-white md:text-3xl">
              Account Details
            </p>
            <p className="mb-6 mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:mt-4 md:text-base">
              Update your profile information below.
            </p>
            <label className="mb-3 px-2.5 font-bold text-zinc-950 dark:text-white" htmlFor={'name'}>
              Your Name
            </label>
            <form id="nameForm" onSubmit={handleSubmitName} className="mb-8 flex flex-col md:flex-row">
              <Input
                type="text"
                name="fullName"
                defaultValue={user?.name || ''}
                placeholder="Enter your full name"
                className="mb-2 flex h-full w-full px-4 py-4 outline-none md:mb-0"
              />
              <Button form="nameForm" type="submit" className="md:ms-4 md:w-[300px]">
                Update name
              </Button>
            </form>
            <label className="mb-3 px-2.5 font-bold text-zinc-950 dark:text-white" htmlFor={'email'}>
              Your Email
            </label>
            <form id="emailForm" onSubmit={handleSubmitEmail} className="mb-8 flex flex-col md:flex-row">
              <Input
                type="email"
                name="newEmail"
                defaultValue={user?.email || ''}
                placeholder="Enter your email"
                className="mb-2 flex h-full w-full px-4 py-4 outline-none md:mb-0"
              />
              <Button form="emailForm" type="submit" className="md:ms-4 md:w-[300px]">
                Update email
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
