
import {
  service
} from '@/pages/';

const aRoutes = [{
  path: '/login',
  component: service.Login,
  exact: true
}, {
  path: '/chatroom',
  component: service.Chatroom,
  exact: true
}, {
  path: '/user',
  component: service.User,
  exact: true
}];

export default aRoutes;