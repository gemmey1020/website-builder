'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Input,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Text,
  Flex,
  Card,
  Heading,
  useColorModeValue,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react';
import DashboardLayout from '@/components/layout';

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <DashboardLayout user={user} title="Account Settings" description="Manage your profile settings." children={''} userDetails={undefined}>
      <Flex direction="column" align="center" py={10}>
        <Card p={8} w={{ base: "full", md: "50%" }} boxShadow="lg">
          <Flex align="center" direction="column" mb={6}>
            <Avatar size="xl" name={user?.name} src={user?.avatar_url} />
            <Heading size="md" mt={4}>{user?.name}</Heading>
            <Text color="gray.500">{user?.role || "User"}</Text>
          </Flex>
          <Divider my={4} />
          <VStack spacing={4}>
            <HStack w="full">
              <Text w="40%" fontWeight="bold">Your Name</Text>
              <Input placeholder="Enter your full name" defaultValue={user?.name || ''} />
              <Button colorScheme="blue">Update</Button>
            </HStack>
            <HStack w="full">
              <Text w="40%" fontWeight="bold">Your Email</Text>
              <Input type="email" placeholder="Enter your email" defaultValue={user?.email || ''} />
              <Button colorScheme="blue">Update</Button>
            </HStack>
          </VStack>
        </Card>
      </Flex>
    </DashboardLayout>
  );
}
