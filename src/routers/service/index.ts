import { Service } from '@/_pages';

let aRoutes = [
  {
    path: '/service',
    component: Service.Login,
    exact: true,
  },
  {
    path: '/service/login',
    component: Service.Login,
    exact: true,
  },
  {
    path: '/service/chatroom',
    component: Service.Chatroom,
    exact: true,
  },
  {
    path: '/service/user',
    component: Service.User,
    exact: true,
  },
];

export default aRoutes;
