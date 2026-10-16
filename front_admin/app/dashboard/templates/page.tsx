
// // -----------------------------
// 'use client';

// import { useEffect, useState } from 'react';
// import { Button, Table, Thead, Tbody, Tr, Th, Td, Image, Spinner } from '@chakra-ui/react';

// export default function TemplatesPage() {
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/templates', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         setTemplates(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching templates:', err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Spinner size="xl" />
//       </div>
//     );
//   }

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold mb-5">Templates Management</h1>

//       <Table variant="simple" size="lg">
//         <Thead>
//           <Tr>
//             <Th>Image</Th>
//             <Th>Name</Th>
//             <Th>Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {templates.map((template) => (
//             <Tr key={template.id} className="text-center">
//               <Td>
//                 <Image src={`http://127.0.0.1:8000/storage/${template.image}`} alt={template.name} boxSize="50px" />
//               </Td>
//               <Td>{template.name}</Td>
//               <Td>
//                 <Button colorScheme="blue" mr={2}>Edit</Button>
//                 <Button colorScheme="red">Delete</Button>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </div>
//   );
// }





'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  Spinner,
  Heading,
  Container,
} from '@chakra-ui/react';
import DashboardLayout from '@/components/layout';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/templates', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${document.cookie.replace(
          /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
          '$1'
        )}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching templates:', err);
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


  if (loading)
    return (

      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" color="blue.500" />
      </Box>

    );

  return (
    <DashboardLayout user={user} title="Account Settings" description="Manage your templetes.">
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" size="xl" mb={6}>
        Templates Management
      </Heading>

      <Box overflowX="auto" borderRadius="md" boxShadow="md" bg="white" p={4}>
        <Table variant="simple">
          <Thead bg="gray.100">
            <Tr>
              <Th textAlign="center">Image</Th>
              <Th textAlign="center">Name</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {templates.map((template) => (
              <Tr key={template.id} textAlign="center">
                <Td>
                  <Image
                    src={`http://127.0.0.1:8000/storage/${template.image}`}
                    alt={template.name}
                    boxSize="50px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Td>
                <Td fontWeight="bold">{template.name}</Td>
                <Td>
                  <Button colorScheme="blue" size="sm" mr={2}>
                    Edit
                  </Button>
                  <Button colorScheme="red" size="sm">
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
    </DashboardLayout>
  );
}
