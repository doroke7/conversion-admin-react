import { Admin } from '@/Pages';

let aRoutes = [
  {
    path: '/admin/sample',
    component: Admin.Sample,
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
  },
  {
    path: '/admin/resource/domain/index',
    component: Admin.Resource.Domain.Index,
    exact: true
  },
  {
    path: '/admin/resource/room/index',
    component: Admin.Resource.Room.Index,
    exact: true
  },
  {
    path: '/admin/resource/user/index',
    component: Admin.Resource.User.Index,
    exact: true
  },
  {
    path: '/admin/resource/word/index',
    component: Admin.Resource.Word.Index,
    exact: true
  },
  {
    path: '/admin/resource/administrator/index',
    component: Admin.Resource.Administrator.Index,
    exact: true
  }
];

export default aRoutes;
