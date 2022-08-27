import React, { useContext, useEffect } from 'react';

import Pages from '@/Pages/Index';

let aRoutes = [
  {
    id: '1-0-0',
    path: '/admin',
    title: '影视',
    text: '',
    icon: '', // icon 使用文字型的， 这种格式对于 后端 JSON 文本数据兼容性更好
    Component: Pages.Admin._,
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
    Component: Pages.Admin.Resource._,
    exact: false, // 相同 父层路由会模糊匹配 如果 exact=false
    authenticator: true,
    redirections: ['/admin/authentication/authenticator/sign-in', null],
    // redirections[0]: authenticator fail后 重定向的页面，null 表示不重定向
    // redirections[1]: authenticator success 后 重定向的页面，null 表示不重定向
    routes: [
      // 嵌套路由必须 使用 exact=false
      {
        id: '2-1-0',
        path: '',
        title: '影视系',
        text: '',
        icon: '',
        Component: Pages.Admin.Resource.Index,
        // Component: React.lazy(() =>
        //   import('@/Pages/Admin/Resource/AppUser/Index').then((oModule: any) => ({ default: oModule.Index }))
        // ),
        exact: true
      },
      {
        id: '2-2-0',
        path: '/app-user/index/app-id/:appId/page/:page/size/:size',
        title: '影视系-用户列表',
        text: '用户列表',
        icon: 'AccountBoxTwoToneIcon', // icon 使用文字型的， 这种格式对于 后端 JSON 文本数据兼容性更好
        Component: Pages.Admin.Resource.AppUser.Index,
        // Component: React.lazy(() =>
        //   import('@/Pages/Admin/Resource/AppUser/Index').then((oModule: any) => ({ default: oModule.Index }))
        // ),
        exact: false
      },
      {
        id: '2-3-0',
        path: '/order-info/index/app-id/:appId/page/:page/size/:size',
        title: '影视系-订单列表',
        text: '订单列表',
        icon: 'EventNoteTwoToneIcon',
        Component: Pages.Admin.Resource.OrderInfo.Index,
        exact: false
      },
      {
        id: '2-4-0',
        path: '/*/app-id/:appId/page/:page/size/:size',
        title: '分页未定义',
        text: '',
        icon: 'WarningTwoToneIcon',
        Component: Pages.Admin.Resource.None.Index,
        exact: false
      },
      {
        id: '2-5-0',
        path: '/*',
        title: '分页未定义',
        text: '',
        icon: 'WarningTwoToneIcon',
        Component: Pages.Admin.Resource.None.Index,
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
    Component: Pages.Admin.Authentication.Authenticator.SignIn,
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
    Component: Pages.Admin.None,
    exact: false,
    authenticator: false,
    redirections: [null, null],
    routes: []
  }
];
export default aRoutes;
