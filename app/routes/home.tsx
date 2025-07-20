import Landing from '~/pages/Landing/landing';
export function meta() {
  return [
    { title: 'Restzo' },
    {
      name: 'description',
      content: 'Welcome to Reztro a Restructured POS system',
    },
  ];
}

export default function Home() {
  return (
    <>
      <Landing />
    </>
  );
}
