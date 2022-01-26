import Layout from '../components/layout';
import '../styles/globals.css';
import Theme from '../theme';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Theme>
        <Head>
          <link rel='shortcut icon' href='/logo.svg' />
          <title>Vex | Just Write</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </Theme>
    </UserContext.Provider>
  );
}

export default MyApp;
