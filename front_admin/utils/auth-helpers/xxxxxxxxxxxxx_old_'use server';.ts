'use server';

// import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getURL, getErrorRedirect, getStatusRedirect } from '@/utils/helpers';
import { getAuthTypes } from '@/utils/auth-helpers/settings';

function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function SignOut() {
  let redirectPath: string;

  try {
    await fetch('http://127.0.0.1:8000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${document.cookie.replace(
          /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        )}`
      }
    });

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    redirectPath = '/dashboard/signin';
  } catch (error) {
    redirectPath = getErrorRedirect(
      '/dashboard/settings',
      'Logout failed',
      'Something went wrong.'
    );
  }

  return redirectPath;
}


export async function signInWithEmail(formData: FormData) {
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    return getErrorRedirect(
      '/dashboard/signin/email_signin',
      'Invalid email address.',
      'Please try again.'
    );
  }

  try {
    const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'credentials': 'include'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
      document.cookie = `token=${data.token}; path=/`;
      redirectPath = getStatusRedirect(
        '/dashboard/main',
        'Success!',
        'You are now signed in.'
      );
    } else {
      redirectPath = getErrorRedirect(
        '/dashboard/signin/email_signin',
        'Authentication failed',
        'Please check your credentials and try again.'
      );
    }
  } catch (error) {
    redirectPath = getErrorRedirect(
      '/dashboard/signin/email_signin',
      'Sign in error',
      'Something went wrong. Please try again.'
    );
  }

  return redirectPath;
}


export async function requestPasswordUpdate(formData: FormData) {
  const email = String(formData.get('email')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    return getErrorRedirect(
      '/dashboard/signin/forgot_password',
      'Invalid email address.',
      'Please try again.'
    );
  }

  try {
    const res = await fetch('http://127.0.0.1:8000/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    redirectPath = getStatusRedirect(
      '/dashboard/signin/forgot_password',
      'Success!',
      'Check your email for a password reset link.'
    );
  } catch (error) {
    redirectPath = getErrorRedirect(
      '/dashboard/signin/forgot_password',
      'Error resetting password',
      'Please try again.'
    );
  }

  return redirectPath;
}


export async function signInWithPassword(email: string, password: string) {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3001' // `Origin` header is required for CORS
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await res.json();

    if (data.token) {
      localStorage.setItem('authToken', data.token);
      return { success: true, token: data.token, user: data.user };
    } else {
      throw new Error('Login failed');
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}


export async function signUp(formData: FormData) {
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    return getErrorRedirect(
      '/dashboard/signin/signup',
      'Invalid email address.',
      'Please try again.'
    );
  }

  try {
    const res = await fetch('http://127.0.0.1:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
      document.cookie = `token=${data.token}; path=/`;
      redirectPath = getStatusRedirect(
        '/',
        'Success!',
        'Account created successfully. You are now signed in.'
      );
    } else {
      redirectPath = getErrorRedirect(
        '/dashboard/signin/signup',
        'Registration failed',
        'An error occurred. Please try again.'
      );
    }
  } catch (error) {
    redirectPath = getErrorRedirect(
      '/dashboard/signin/signup',
      'Registration error',
      'Something went wrong. Please try again.'
    );
  }

  return redirectPath;
}


export async function updatePassword(formData: FormData) {
  const password = String(formData.get('password')).trim();
  const passwordConfirm = String(formData.get('passwordConfirm')).trim();
  let redirectPath: string;

  // Check that the password and confirmation match
  if (password !== passwordConfirm) {
    redirectPath = getErrorRedirect(
      '/dashboard/signin/update_password',
      'Your password could not be updated.',
      'Passwords do not match.'
    );
  }

  const supabase = createClient();
  const { error, data } = await supabase.auth.updateUser({
    password
  });

  if (error) {
    redirectPath = getErrorRedirect(
      '/dashboard/signin/update_password',
      'Your password could not be updated.',
      error.message
    );
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      '/',
      'Success!',
      'Your password has been updated.'
    );
  } else {
    redirectPath = getErrorRedirect(
      '/dashboard/signin/update_password',
      'Hmm... Something went wrong.',
      'Your password could not be updated.'
    );
  }

  return redirectPath;
}

export async function updateEmail(formData: FormData) {
  // Get form data
  const newEmail = String(formData.get('newEmail')).trim();

  // Check that the email is valid
  if (!isValidEmail(newEmail)) {
    return getErrorRedirect(
      '/dashboard/settings',
      'Your email could not be updated.',
      'Invalid email address.'
    );
  }

  const supabase = createClient();

  const callbackUrl = getURL(
    getStatusRedirect(
      '/dashboard/settings',
      'Success!',
      `Your email has been updated.`
    )
  );

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: callbackUrl
    }
  );

  if (error) {
    return getErrorRedirect(
      '/dashboard/settings',
      'Your email could not be updated.',
      error.message
    );
  } else {
    return getStatusRedirect(
      '/dashboard/settings',
      'Confirmation emails sent.',
      `You will need to confirm the update by clicking the links sent to both the old and new email addresses.`
    );
  }
}

export async function updateName(formData: FormData) {
  // Get form data
  const fullName = String(formData.get('fullName')).trim();

  const supabase = createClient();
  const { error, data } = await supabase.auth.updateUser({
    data: { full_name: fullName }
  });

  if (error) {
    return getErrorRedirect(
      '/dashboard/settings',
      'Your name could not be updated.',
      error.message
    );
  } else if (data.user) {
    return getStatusRedirect(
      '/dashboard/settings',
      'Success!',
      'Your name has been updated.'
    );
  } else {
    return getErrorRedirect(
      '/dashboard/settings',
      'Hmm... Something went wrong.',
      'Your name could not be updated.'
    );
  }
  export async function fetchUser() {
    try {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
        );

        if (!token) {
            console.error("❌ No auth token found in cookies!");
            return null;
        }

        console.log("🔹 Sending request to /api/auth/me with token:", token);

        const res = await fetch("http://127.0.0.1:8000/api/auth/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include"  // ✅ Ensure credentials are included
        });

        console.log("🔹 API Response Status:", res.status);

        const text = await res.text(); // Read response as text before parsing JSON
        console.log("🔹 API Response Text:", text);

        if (!res.ok) {
            throw new Error(`Error fetching user: ${res.statusText}`);
        }

        const data = JSON.parse(text); // Convert text response to JSON
        return data;
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        return null;
    }
}


}
