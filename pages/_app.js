import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChakraProvider, Flex, Spinner } from '@chakra-ui/react';
import Navbar, { MobileDashboard } from '@components/Navbar';
import { AuthProvider } from '@lib/auth';
import Layout from '@components/Layout';

function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <ChakraProvider resetCSS>
      <AuthProvider>
        <Navbar />
        {pageLoading ? (
          <Flex minH='calc(100vh)' w='full' align='center' justify='center'>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Flex>
        ) : (
          <Layout>
            <Component {...pageProps} loading={pageLoading} />
          </Layout>
        )}
        <MobileDashboard />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
