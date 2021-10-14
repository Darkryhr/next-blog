import Link from 'next/link';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
export default function Home() {
  return (
    <div>
      <Link href='/enter'>enter</Link>
      <Loader show />
      <button
        onClick={() =>
          toast.success('YOOO', {
            style: {
              background: '#333',
              color: '#fff',
            },
          })
        }
      >
        toasty
      </button>
    </div>
  );
}
