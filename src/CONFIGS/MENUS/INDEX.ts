import SupervisedUserCircleTwoToneIcon from '@material-ui/icons/SupervisedUserCircleTwoTone';
import CloudDoneTwoToneIcon from '@material-ui/icons/CloudDoneTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';

let MENUS: any = [
  {
    id: 1,
    text: '会员管理',
    description: '会员管理',
    path: '/admin/app_user/index',
    icon: 'AppsRoundedIcon',
    menus: [
      {
        id: 11,
        text: '会员列表',
        description: '会员列表',
        path: '/admin/app_user/app_user',
        icon: 'AppsRoundedIcon'
      },
      {
        id: 12,
        text: '会员订单列表',
        description: '会员订单列表',
        path: '/admin/app_user/app_user',
        icon: 'AppsRoundedIcon'
      }
    ]
  },
  {
    id: 2,
    text: '广告管理',
    description: '广告管理',
    path: '/admin/advertisement/index',
    icon: 'AppsRoundedIcon',
    menus: [
      {
        id: 21,
        text: '首页广告',
        description: '会员管理',
        path: '/admin/advertisement/main',
        icon: 'AppsRoundedIcon'
      },
      {
        id: 22,
        text: '跑马广告',
        description: '跑马广告',
        path: '/admin/advertisement/marquee',
        icon: 'AppsRoundedIcon'
      }
    ]
  },
  {
    id: 4,
    text: '系统管理',
    description: '系统管理',
    path: '/admin/system/index',
    icon: 'AppsRoundedIcon',
    menus: [
      {
        id: 41,
        text: '权限管理',
        description: '权限管理',
        path: '/admin/system/authroization',
        icon: 'AppsRoundedIcon',
        menus: [
          {
            id: 411,
            text: '管理员列表',
            description: '管理员列表',
            path: '/admin/system/administrator',
            icon: 'AppsRoundedIcon'
          },
          {
            id: 412,
            text: '角色列表',
            description: '角色列表',
            path: '/admin/system/role',
            icon: 'AppsRoundedIcon'
          }
        ]
      },
      {
        id: 42,
        text: '视频域名列表',
        description: '视频域名列表',
        path: '/admin/system/domain_name',
        icon: 'AppsRoundedIcon'
      }
    ]
  }
];

export default MENUS;
