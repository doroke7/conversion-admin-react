import { Admin } from '@/Pages';

let aRoutes = [
  {
    path: '/admin',
    component: Admin._,
    exact: true
  },
  {
    path: '/admin/authentication/authenticator/sign-in',
    component: Admin.Authentication.Authentication.SignIn,
    exact: true
  },
  {
    path: '/admin/resource/domain/do',
    component: Admin.Resource.Domain.Do,
    exact: true
  },
  {
    path: '/admin/resource/room/do',
    component: Admin.Resource.Room.Do,
    exact: true
  },
  {
    path: '/admin/resource/user/do',
    component: Admin.Resource.User.Do,
    exact: true
  },
  {
    path: '/admin/resource/word/do',
    component: Admin.Resource.Word.Do,
    exact: true
  },
  {
    path: '/admin/resource/administrator/do',
    component: Admin.Resource.Administrator.Do,
    exact: true
  }
];

export default aRoutes;
