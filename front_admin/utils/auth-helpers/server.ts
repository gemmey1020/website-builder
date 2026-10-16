'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getURL, getErrorRedirect, getStatusRedirect } from '@/utils/helpers';

function isValidEmail(email: string) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
}

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function SignOut() {
  let redirectPath = '/dashboard/signin';

  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      console.warn("No auth token found for logout.");
      return redirectPath;
    }

    await fetch('http://127.0.0.1:8000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    });

    cookies().delete('token');

  } catch (error) {
    console.error("Logout failed:", error);
  }

  return redirectPath;
}

export async function signInWithEmail(formData: FormData) {
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();

  if (!isValidEmail(email)) {
    return getErrorRedirect('/dashboard/signin/email_signin', 'Invalid email address.', 'Please try again.');
  }

  try {
    const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    const data = await res.json();

    if (data.token) {
      cookies().set('token', data.token);
      return getStatusRedirect('/dashboard/main', 'Success!', 'You are now signed in.');
    } else {
      return getErrorRedirect('/dashboard/signin/email_signin', 'Authentication failed', 'Please check your credentials and try again.');
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    return getErrorRedirect('/dashboard/signin/email_signin', 'Sign in error', 'Something went wrong. Please try again.');
  }
}

export async function fetchUser() {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      console.warn("No auth token found in cookies.");
      return null;
    }

    console.log("🔹 Sending request to /api/auth/me with token:", token);

    const res = await fetch("http://127.0.0.1:8000/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "include"
    });

    console.log("🔹 API Response Status:", res.status);

    if (!res.ok) {
      throw new Error(`Error fetching user: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return null;
  }
}

export async function signUp(formData: FormData) {
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();

  if (!isValidEmail(email)) {
    return getErrorRedirect('/dashboard/signin/signup', 'Invalid email address.', 'Please try again.');
  }

  try {
    const res = await fetch('http://127.0.0.1:8000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      cookies().set('token', data.token);
      return getStatusRedirect('/', 'Success!', 'Account created successfully. You are now signed in.');
    } else {
      return getErrorRedirect('/dashboard/signin/signup', 'Registration failed', 'An error occurred. Please try again.');
    }
  } catch (error) {
    console.error("Registration error:", error);
    return getErrorRedirect('/dashboard/signin/signup', 'Registration error', 'Something went wrong. Please try again.');
  }
}
