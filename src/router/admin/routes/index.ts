import { Admin } from '@/Pages';

let aRoutes1 = [
  {
    path: '/admin',
    component: Admin._,
    exact: true, // 相同 父层路由会模糊匹配 如果 exact=false
    nav: true
  },
  {
    path: '/admin/resource/app-user/index',
    component: Admin.Resource.AppUser.Index,
    exact: true,
    nav: true
  },
  {
    path: '/admin/authentication/authenticator/sign-in',
    component: Admin.Authentication.Authenticator.SignIn,
    exact: true,
    nav: false
  }
];
export default aRoutes1;
