import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/dashboard/*', 'routes/dashboardLayout.tsx', [
    route('manage-user', 'modules/UserTable/UserTable.tsx'),
    route('table-management', 'modules/TableManagement/TableManagement.tsx'),
    route('menu-custom', 'modules/MenuCustom/MenuCustom.tsx'),
    route('quick-order', 'modules/QuickOrder/QuickOrder.tsx'),
  ]),
  route('/login', 'routes/signIn.tsx'),
  route('/signup', 'routes/signUp.tsx'),
] satisfies RouteConfig;
