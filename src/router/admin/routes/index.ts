import React, { useContext, useEffect } from 'react';

import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
import ReportIcon from '@material-ui/icons/Report';
import { Admin } from '@/Pages';

let aRoutes = [
  {
    path: '/admin/resource',
    title: '影视系后台系统',
    Icon: null,
    Component: Admin.Resource.Index,
    exact: false, // 相同 父层路由会模糊匹配 如果 exact=false
    authenticator: true,
    routes: [
      // 嵌套路由必须 使用 exact=false
      {
        path: '/app-user/index',
        title: '影视系-用户列表',
        Icon: AccountCircleTwoToneIcon,
        Component: Admin.Resource.AppUser.Index,
        // Component: React.lazy(() =>
        //   import('@/Pages/Admin/Resource/AppUser/Index').then((oModule: any) => ({ default: oModule.Index }))
        // ),
        exact: false
      },
      {
        path: '/order-info/index',
        title: '影视系-订单列表',
        Icon: ListAltTwoToneIcon,
        Component: Admin.Resource.OrderInfo.Index,
        exact: false
      },
      {
        path: '/*',
        title: '分页未定义',
        Icon: ReportIcon,
        Component: Admin.Resource.None.Index,
        exact: false
      }
    ]
  },
  {
    path: '/admin/authentication/authenticator/sign-in',
    title: '登入系统',
    Icon: null,
    Component: Admin.Authentication.Authenticator.SignIn,
    exact: false,
    authenticator: false,
    routes: []
  },
  {
    path: '/admin/*',
    title: '页面不存在',
    Icon: null,
    Component: Admin.None,
    exact: false,
    authenticator: false,
    routes: []
  }
];
export default aRoutes;
