// 'use client';

// import { Badge } from '@/components/ui/badge';
// import { Button } from '../ui/button';
// import {
//   renderThumb,
//   renderTrack,
//   renderView
// } from '@/components/scrollbar/Scrollbar';
// import Links from '@/components/sidebar/components/Links';
// import SidebarCard from '@/components/sidebar/components/SidebarCard';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Card } from '@/components/ui/card';
// import { IRoute } from '@/types/types';
// import { useRouter } from 'next/navigation';
// import React, { PropsWithChildren, useEffect, useState } from 'react';
// import { Scrollbars } from 'react-custom-scrollbars-2';
// import { HiX } from 'react-icons/hi';
// import { HiBolt } from 'react-icons/hi2';
// import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

// export interface SidebarProps extends PropsWithChildren {
//   routes: IRoute[];
//   [x: string]: any;
// }

// function Sidebar(props: SidebarProps) {
//   const router = useRouter();
//   const { routes } = props;
//   const [user, setUser] = useState(null);

//   // دالة لاسترجاع التوكن من الكوكيز
//   function getAuthToken() {
//     return document.cookie.replace(
//       /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
//       "$1"
//     );
//   }

//   // جلب بيانات المستخدم عند تحميل الصفحة
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const token = getAuthToken();
//         if (!token) return;

//         const res = await fetch('http://127.0.0.1:8000/api/auth/me', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setUser(data.user);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     }

//     fetchUser();
//   }, []);

//   // تسجيل الخروج
//   const handleSignOut = async (e) => {
//     e.preventDefault();
//     try {
//       const token = getAuthToken();
//       await fetch('http://127.0.0.1:8000/api/auth/logout', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       // حذف التوكن من الكوكيز
//       document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//       router.push('/dashboard/signin');
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   // SIDEBAR
//   return (
//     <div
//       className={`lg:!z-99 fixed !z-[99] min-h-full w-[300px] transition-all md:!z-[99] xl:!z-0 ${
//         props.variant === 'auth' ? 'xl:hidden' : 'xl:block'
//       } ${props.open ? '' : '-translate-x-[120%] xl:translate-x-[unset]'}`}
//     >
//       <Card
//         className={`m-3 ml-3 h-[96.5vh] w-full overflow-hidden !rounded-lg border-zinc-200 pe-4 dark:border-zinc-800 sm:my-4 sm:mr-4 md:m-5 md:mr-[-50px]`}
//       >
//         <Scrollbars
//           autoHide
//           renderTrackVertical={renderTrack}
//           renderThumbVertical={renderThumb}
//           renderView={renderView}
//           universal={true}
//         >
//           <div className="flex h-full flex-col justify-between">
//             <div>
//               <span
//                 className="absolute top-4 block cursor-pointer text-zinc-200 dark:text-white/40 xl:hidden"
//                 onClick={() => props.setOpen(false)}
//               >
//                 <HiX />
//               </span>
//               <div className={`mt-8 flex items-center justify-center`}>
//                 <div className="me-2 flex h-[40px] w-[40px] items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
//                   <HiBolt className="h-5 w-5" />
//                 </div>
//                 <h5 className="me-2 text-2xl font-bold leading-5 text-zinc-950 dark:text-white">
//                   Horizon AI
//                 </h5>
//                 <Badge
//                   variant="outline"
//                   className="my-auto w-max px-2 py-0.5 text-xs text-zinc-950 dark:border-none dark:bg-zinc-800 dark:text-white"
//                 >
//                   FREE
//                 </Badge>
//               </div>
//               <div className="mb-8 mt-8 h-px bg-zinc-200 dark:bg-white/10" />
//               {/* Nav item */}
//               <ul>
//                 <Links routes={routes} />
//               </ul>
//             </div>
//             {/* Free Horizon Card    */}
//             <div className="mb-9 mt-7">
//               <div className="flex justify-center">
//                 <SidebarCard />
//               </div>

//               {/* Sidebar profile info */}
//               <div className="mt-5 flex w-full items-center rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
//                 <a href="/dashboard/settings">
//                   <Avatar className="min-h-10 min-w-10">
//                     <AvatarImage src={user?.avatar_url} />
//                     <AvatarFallback className="font-bold dark:text-zinc-950">
//                       {user?.name ? user.name[0] : user?.email[0]?.toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                 </a>
//                 <a href="/dashboard/settings">
//                   <p className="ml-2 mr-3 flex items-center text-sm font-semibold leading-none text-zinc-950 dark:text-white">
//                     {user?.name || 'User'}
//                   </p>
//                 </a>
//                 <Button
//                   onClick={handleSignOut}
//                   variant="outline"
//                   className="ml-auto flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full p-0 text-center text-sm font-medium hover:dark:text-white"
//                   type="submit"
//                 >
//                   <HiOutlineArrowRightOnRectangle
//                     className="h-4 w-4 stroke-2 text-zinc-950 dark:text-white"
//                     width="16px"
//                     height="16px"
//                     color="inherit"
//                   />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Scrollbars>
//       </Card>
//     </div>
//   );
// }

// // PROPS

// export default Sidebar;


// 'use client';

// import { useState } from 'react';
// import { HiOutlineX, HiOutlineMenu } from 'react-icons/hi';
// import Link from 'next/link';
// import { routes } from '@/components/routes';

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="flex sidebar-container">
//       {/* Sidebar Toggle Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-3 text-gray-800 dark:text-white focus:outline-none"
//       >
//         {isOpen ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
//       </button>

//       {/* Sidebar Menu */}
//       <div
//         className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } transition-transform duration-300 ease-in-out`}
//       >
//         <div className="p-5 text-xl font-bold text-gray-800 dark:text-white">My Dashboard</div>

//         <nav>
//           <ul>
//             {routes.map((route, index) => (
//               <li key={index} className={`px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700`}>
//                 <Link href={route.path} className="flex items-center space-x-2">
//                   {route.icon}
//                   <span>{route.name}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <div className="flex justify-end p-5">
//           <button className="px-4 py-2 bg-gray-800 dark:bg-gray-500 text-white font-bold rounded-full">
//             Sign Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect, useRef } from 'react';
import { HiOutlineX, HiOutlineMenu } from 'react-icons/hi';
import Link from 'next/link';
import { routes } from '@/components/routes';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null); // مرجع للـ Sidebar

  // 🔹 إغلاق القائمة لما المستخدم يضغط خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex sidebar-container">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 text-gray-800 dark:text-white focus:outline-none"
      >
        {isOpen ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
      </button>

      {/* Sidebar Menu */}
      <div
        ref={sidebarRef} // مرجع لإغلاق القائمة عند الضغط خارجها
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-5 text-xl font-bold text-gray-800 dark:text-white">My Dashboard</div>

        <nav>
          <ul>
            {routes.map((route, index) => (
              <li
                key={index}
                className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)} // ✅ يغلق القائمة عند الضغط على أي عنصر
              >
                <Link href={route.path} className="flex items-center space-x-2">
                  {route.icon}
                  <span>{route.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sign Out Button */}
        <div className="flex justify-end p-5">
          <button
            className="px-4 py-2 bg-gray-800 dark:bg-gray-500 text-white font-bold rounded-full"
            onClick={() => setIsOpen(false)} // ✅ يغلق القائمة عند الضغط على "Sign Out"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
