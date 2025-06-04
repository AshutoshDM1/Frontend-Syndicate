import { useEffect } from 'react';
import { toast } from 'sonner';
import Signup from '~/pages/Signup';
export function meta() {
  return [
    { title: 'Pos - Login' },
    {
      name: 'description',
      content: 'Welcome to Reztro a Restructured POS system',
    },
  ];
}

export default function Home() {
  useEffect(() => {
    toast.success('I have Created this Page in 5 min ');
  }, []);

  return (
    <>
      <Signup />
    </>
  );
}
