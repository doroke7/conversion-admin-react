import { service } from '@/pages/';

let aRoutes = [
  {
    path: '/service',
    component: service.Login,
    exact: true,
  },
  {
    path: '/service/login',
    component: service.Login,
    exact: true,
  },
  {
    path: '/service/chatroom',
    component: service.Chatroom,
    exact: true,
  },
  {
    path: '/service/user',
    component: service.User,
    exact: true,
  },
];

export default aRoutes;
