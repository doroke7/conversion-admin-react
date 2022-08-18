import Pages from '@/Pages/Index';

let aRoutes = [
  {
    path: '/service',
    component: Pages.Service.Login,
    exact: true
  },
  {
    path: '/service/login',
    component: Pages.Service.Login,
    exact: true
  },
  {
    path: '/service/chatroom',
    component: Pages.Service.Chatroom,
    exact: true
  },
  {
    path: '/service/user',
    component: Pages.Service.User,
    exact: true
  }
];

export default aRoutes;
