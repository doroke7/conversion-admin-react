import { Admin } from '@/Pages';
import CONFIGS from '@/CONFIGS';
let aRoutes1 = [
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
    path: '/admin/resource/app-user/index',
    component: Admin.Resource.AppUser.Index,
    exact: true
  }
];

let aRoutes2 = [
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
    path: '/admin/sample-badge',
    component: Admin.SampleBadge,
    exact: true
  },
  {
    path: '/admin/sample-tabs',
    component: Admin.SampleTabs,
    exact: true
  }
];
aRoutes1 = CONFIGS.APP.ENV.toUpperCase() == 'MASTER' ? aRoutes1 : aRoutes1.concat(aRoutes2);

export default aRoutes1;
