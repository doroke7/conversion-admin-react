import { Admin } from '@/Pages';

let aRoutes = [
  {
    path: '/admin',
    component: Admin._,
    exact: false, // 相同 父层路由会模糊匹配 如果 exact=false
    routes: [
      // 嵌套路由必须 使用 exact=false
      {
        path: '/resource/app-user/index',
        component: Admin.Resource.AppUser.Index,
        exact: false
      },
      {
        path: '/resource/order-info/index',
        component: Admin.Resource.OrderInfo.Index,
        exact: false
      },
      {
        path: '/*',
        component: Admin.Resource.None.Index,
        exact: false
      }
    ]
  },
  {
    path: '/admin/authentication/authenticator/sign-in',
    component: Admin.Authentication.Authenticator.SignIn,
    exact: true,
    routes: []
  }
];
export default aRoutes;
