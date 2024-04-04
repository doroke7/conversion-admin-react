import Pages from '@/admin/Pages/Index';

let aRoutes = [
  {
    id: '1-0-0',
    path: '/admin',
    title: '影视',
    text: '',
    icon: '', // icon 使用文字型的， 这种格式对于 后端 JSON 文本数据兼容性更好
    Component: Pages.Index.Index,
    exact: true,
    authenticator: false,
    redirections: [null, null],
    routes: []
  },
  {
    id: '2-0-0',
    path: '/admin/resource',
    title: '影视系后台系统',
    text: '',
    icon: '',
    Component: Pages.Resource._,
    exact: false, // 相同 父层路由会模糊匹配 如果 exact=false
    authenticator: true,
    redirections: ['/admin/authentication/authenticator/sign-in', null],
    // redirections[0]: authenticator fail后 重定向的页面，null 表示不重定向
    // redirections[1]: authenticator success 后 重定向的页面，null 表示不重定向
    routes: [
      {
        id: '2-1-0',
        path: '',
        title: '影视系',
        text: '',
        icon: '',
        Component: Pages.Resource.Index,
        authenticator: true,
        redirections: ['/admin/authentication/authenticator/sign-in', null],
        exact: true
      },
      {
        id: '2-2-0',
        path: '/app-user/index/app-id/:appId/page/:page/size/:size',
        title: '影视系-用户列表',
        text: '用户列表',
        icon: 'AccountBoxTwoToneIcon', // icon 使用文字型的， 这种格式对于 后端 JSON 文本数据兼容性更好
        Component: Pages.Resource.AppUser.Index,
        authenticator: true,
        redirections: ['/admin/authentication/authenticator/sign-in', null],
        exact: false
      },
      {
        id: '2-3-0',
        path: '/order-info/index/app-id/:appId/page/:page/size/:size',
        title: '影视系-订单列表',
        text: '订单列表',
        icon: 'EventNoteTwoToneIcon',
        Component: Pages.Resource.OrderInfo.Index,
        authenticator: true,
        redirections: ['/admin/authentication/authenticator/sign-in', null],
        exact: false
      },
      {
        id: '2-4-0',
        path: '/config/index/app-id/:appId',
        title: '影视系-平台配置',
        text: '平台配置',
        icon: 'BorderAllOutlinedIcon',
        Component: Pages.Resource.Config.Index,
        authenticator: true,
        redirections: ['/admin/authentication/authenticator/sign-in', null],
        exact: false
      },
      {
        id: '2-none-1',
        path: '/*/app-id/:appId/page/:page/size/:size',
        title: '分页未定义',
        text: '',
        icon: 'WarningTwoToneIcon',
        Component: Pages.Resource.None,
        authenticator: true,
        redirections: ['/admin/authentication/authenticator/sign-in', null],
        exact: false
      },
      {
        id: '2-none-2',
        path: '/*',
        title: '分页未定义',
        text: '',
        icon: 'WarningTwoToneIcon',
        Component: Pages.Resource.None,
        authenticator: true,
        redirections: ['/admin/authentication/authenticator/sign-in', null],
        exact: false
      }
    ]
  },
  {
    id: '3-0-0',
    path: '/admin/authentication/authenticator/sign-in',
    title: '登入系统',
    text: '',
    icon: '', // icon 使用文字型的， 这种格式对于 后端 JSON 文本数据兼容性更好
    Component: Pages.Authentication.Authenticator.SignIn,
    exact: false,
    authenticator: true,
    redirections: [null, '/admin/resource'],
    routes: []
  },
  {
    id: '4-0-0',
    path: '/admin/*',
    title: '页面不存在',
    text: '',
    icon: '', // icon 使用文字型的， 这种格式对于 后端 JSON 文本数据兼容性更好
    Component: Pages.None,
    exact: false,
    authenticator: false,
    redirections: [null, null],
    routes: []
  }
];
export default aRoutes;
