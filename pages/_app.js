import Layout from '../components/layout';
import '../styles/globals.css';
import Theme from '../theme';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  // console.log(userData);
  return (
    <UserContext.Provider value={userData}>
      <Theme>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Theme>
    </UserContext.Provider>
  );
}

export default MyApp;
