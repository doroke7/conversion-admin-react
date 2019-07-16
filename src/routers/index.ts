
import {
  Chatroom,
  Login,
  User,
} from '@/Pages/';

const aRoutes = [{
  path: '/login',
  component: Login,
  exact: true
}, {
  path: '/chatroom',
  component: Chatroom,
  exact: true
}, {
  path: '/user',
  component: User,
  exact: true
}];

export default aRoutes;