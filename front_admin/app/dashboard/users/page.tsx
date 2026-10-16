'use client';

import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Spinner, Box } from '@chakra-ui/react';
import DashboardLayout from '@/components/layout';
export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);
  function getAuthToken() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = getAuthToken();
        if (!token) return router.push('/dashboard/signin');

        const res = await fetch('http://127.0.0.1:8000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push('/dashboard/signin');
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, []);


  if (loading) return <Spinner size="xl" />;

  return (
     <DashboardLayout user={user} title="users Settings" description="Manage users on system.">
    <Box p={5}>
      <h1 className="text-2xl font-bold mb-5">Users Management</h1>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Button colorScheme="blue" size="sm" mr={2}>
                  Edit
                </Button>
                <Button colorScheme="red" size="sm" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
    </DashboardLayout>
  );
}

// 🛑 حذف مستخدم
const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
      }
    });

    window.location.reload();
  } catch (error) {
    console.error("Failed to delete user", error);
  }
};
