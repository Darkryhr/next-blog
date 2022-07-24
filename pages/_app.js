import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@components/layout';
import Navbar, { MobileDashboard } from '@components/Navbar';
import { AuthProvider } from '../lib/auth';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS>
      <AuthProvider>
        <Navbar />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <MobileDashboard />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
