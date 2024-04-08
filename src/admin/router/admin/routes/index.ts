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
        path: '/admin/resource/app-pipeline/app-id/:appId',
        title: '資源列表',
        text: '資源列表',
        icon: '',
        Component: Pages.Resource.AppPipeline,
        authenticator: true,
        redirections: ['/admin/authentication/authenticator/sign-in', null],
        exact: true
      },
      {
        id: '2-2-0',
        path: '/admin/resource/app',
        title: '應用列表',
        text: '應用列表',
        icon: '',
        Component: Pages.Resource.App,
        authenticator: true,
        redirections: ['/admin/authentication/authenticator/sign-in', null],
        exact: true
      },
      {
        id: '2-3-0',
        path: '/*',
        title: '分页未定义',
        text: '分页未定义',
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
    text: '登入系统',
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
