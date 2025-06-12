import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/dashboard', 'routes/dashboard.tsx'),
  route('/login', 'routes/signIn.tsx'),
  route('/signup', 'routes/signUp.tsx'),
] satisfies RouteConfig;
