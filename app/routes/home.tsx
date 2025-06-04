import { Welcome } from '../welcome/welcome';

export function meta() {
  return [
    { title: 'Project Syndicate' },
    {
      name: 'description',
      content: 'Welcome to Project Syndicate a Restructured POS system',
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
