import { Admin } from '@/Pages';

let aRoutes = [
  {
    path: '/admin/sample',
    component: Admin.Sample,
    exact: true
  },
  {
    path: '/admin/sample1',
    component: Admin.Sample1,
    exact: true
  },
  {
    path: '/admin/sample2',
    component: Admin.Sample2,
    exact: true
  },
  {
    path: '/admin/sample3',
    component: Admin.Sample3,
    exact: true
  },
  {
    path: '/admin',
    component: Admin._,
    exact: true
  },
  {
    path: '/admin/authentication/authenticator/sign-in',
    component: Admin.Authentication.Authenticator.SignIn,
    exact: true
  }
];

export default aRoutes;
