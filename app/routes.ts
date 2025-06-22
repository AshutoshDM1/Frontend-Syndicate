import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/dashboard/*', 'routes/dashboardLayout.tsx', [
    route('manage-user', 'modules/ManageUser/ManageUser.tsx'),
    route('table-management', 'modules/TableMangement/TableMange.tsx'),
    route('menu-custom', 'modules/MenuCustom/MenuCustom.tsx'),
    route('quick-order', 'modules/QuickOrder/QuickOrder.tsx'),
  ]), 
  route('/login', 'routes/signIn.tsx'),
  route('/signup', 'routes/signUp.tsx'),
] satisfies RouteConfig;
