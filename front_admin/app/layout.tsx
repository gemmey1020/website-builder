// import { PropsWithChildren } from 'react';
// import '@/styles/globals.css';
// import { ThemeProvider } from './theme-provider';
// import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// export const dynamic = 'force-dynamic';

// export default function RootLayout({
//   children
// }: PropsWithChildren) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <title>
//           Horizon UI Boilerplate - Launch your startup project 10X in a few
//           moments - The best NextJS Boilerplate (This is an example)
//         </title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         {/* <!--  Social tags   --> */}
//         <meta
//           name="keywords"
//           content="Add here your main keywords and separate them with a comma"
//         />
//         <meta name="description" content="Add here your website description" />
//         {/* <!-- Schema.org markup for Google+ --> */}
//         <meta itemProp="name" content="Add here your website name / title" />
//         <meta
//           itemProp="description"
//           content="Add here your website description"
//         />
//         <meta
//           itemProp="image"
//           content="Add here the link for your website SEO image"
//         />
//         {/* <!-- Twitter Card data --> */}
//         <meta name="twitter:card" content="product" />
//         <meta
//           name="twitter:title"
//           content="Add here your website name / title"
//         />
//         <meta
//           name="twitter:description"
//           content="Add here your website description"
//         />
//         <meta
//           name="twitter:image"
//           content="Add here the link for your website SEO image"
//         />
//         {/* <!-- Open Graph data --> */}
//         <meta
//           property="og:title"
//           content="Add here your website name / title"
//         />
//         <meta property="og:type" content="product" />
//         <meta property="og:url" content="https://your-website.com" />
//         <meta
//           property="og:image"
//           content="Add here the link for your website SEO image"
//         />
//         <meta
//           property="og:description"
//           content="Add here your website description"
//         />
//         <meta
//           property="og:site_name"
//           content="Add here your website name / title"
//         />
//         <link rel="canonical" href="https://your-website.com" />
//         <link rel="icon" href="/img/favicon.ico" />
//       </head>
//       <body id={'root'} className="loading bg-white">
//         {/* ✅ لف كل شيء داخل ChakraProvider */}
//         <ChakraProvider>
//           <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//             <main id="skip">{children}</main>
//           </ThemeProvider>
//         </ChakraProvider>
//       </body>
//     </html>
//   );
// }


// 'use client';

// import { PropsWithChildren } from 'react';
// import { ChakraProvider, extendTheme } from '@chakra-ui/react';
// import { ThemeProvider } from './theme-provider';
// import '@/styles/globals.css';

// // ✅ إنشاء الثيم المخصص
// const theme = extendTheme({
//   styles: {
//     global: {
//       body: {
//         bg: 'gray.50', // لون الخلفية الأساسي
//         color: 'gray.800', // لون النصوص
//       },
//     },
//   },
//   fonts: {
//     heading: `'Inter', sans-serif`,
//     body: `'Inter', sans-serif`,
//   },
// });

// export default function RootLayout({ children }: PropsWithChildren) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <title>Admin Dashboard - Horizon UI</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/img/favicon.ico" />
//       </head>
//       <body id="root" className="loading">
//         <ChakraProvider theme={theme}>
//           <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//             <main id="skip">{children}</main>
//           </ThemeProvider>
//         </ChakraProvider>
//       </body>
//     </html>
//   );
// }
'use client';

import { PropsWithChildren } from 'react';
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react';
import { ThemeProvider, useTheme } from '@/components/theme/theme-provider';
import '@/styles/globals.css';

// ✅ إعداد الثيمات المتعددة
const themeConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const themes = {
  theme1: extendTheme({
    config: themeConfig,
    styles: {
      global: {
        body: {
          bg: 'gray.50',
          color: 'gray.800',
        },
      },
    },
    fonts: {
      heading: `'Inter', sans-serif`,
      body: `'Inter', sans-serif`,
    },
  }),
  theme2: extendTheme({
    config: themeConfig,
    styles: {
      global: {
        body: {
          bg: 'blue.900',
          color: 'white',
        },
      },
    },
    fonts: {
      heading: `'Roboto', sans-serif`,
      body: `'Roboto', sans-serif`,
    },
  }),
  theme3: extendTheme({
    config: themeConfig,
    styles: {
      global: {
        body: {
          bg: 'green.900',
          color: 'white',
        },
      },
    },
    fonts: {
      heading: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
    },
  }),
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Admin Dashboard - Horizon UI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/favicon.ico" />
      </head>
      <body id="root" className="loading">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeWrapper>{children}</ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

// ✅ مكون وسيط للحصول على الثيم المختار وتمريره لـ ChakraProvider
function ThemeWrapper({ children }: PropsWithChildren) {
  const { theme } = useTheme();
  return <ChakraProvider theme={themes[theme] || themes.theme1}>{children}</ChakraProvider>;
}
