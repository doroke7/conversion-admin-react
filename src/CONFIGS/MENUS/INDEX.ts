let MENUS: any = [
  {
    id: 1,
    text: '会员管理',
    description: '会员管理',
    path: '/admin/app_user/index',
    icon: 'AccountBoxIcon',
    menus: [
      {
        id: 11,
        text: '会员列表',
        description: '会员列表',
        path: '/admin/app_user/app_user',
        icon: 'AssignmentIndOutlinedIcon'
      },
      {
        id: 12,
        text: '会员订单列表',
        description: '会员订单列表',
        path: '/admin/app_user/app_user',
        icon: 'PlaylistAddCheckOutlinedIcon'
      }
    ]
  },
  {
    id: 3,
    text: '平台管理',
    description: '平台管理',
    path: '/admin/config/index',
    icon: 'AppsOutlinedIcon',
    menus: [
      {
        id: 31,
        text: '平台配置',
        description: '平台配置',
        path: '/admin/config/config',
        icon: 'BorderAllOutlinedIcon'
      }
    ]
  },
  {
    id: 5,
    text: '资源管理',
    description: '资源管理',
    path: '/admin/vod/index',
    icon: 'MovieCreationOutlinedIcon',
    menus: [
      {
        id: 51,
        text: '视频列表',
        description: '视频列表',
        path: '/admin/vod/vod',
        icon: 'VideocamOutlinedIcon'
      },
      {
        id: 52,
        text: '视频域名列表',
        description: '视频域名列表',
        path: '/admin/system/domain_name',
        icon: 'CloudDoneOutlinedIcon'
      }
    ]
  },
  {
    id: 2,
    text: '广告管理',
    description: '广告管理',
    path: '/admin/advertisement/index',
    icon: 'LineWeightOutlinedIcon',
    menus: [
      {
        id: 21,
        text: '首页广告',
        description: '首页广告',
        path: '/admin/advertisement/main',
        icon: 'DehazeIcon'
      },
      {
        id: 22,
        text: '跑马广告',
        description: '跑马广告',
        path: '/admin/advertisement/marquee',
        icon: 'DehazeIcon'
      }
    ]
  },
  {
    id: 4,
    text: '系统管理',
    description: '系统管理',
    path: '/admin/system/index',
    icon: 'SettingsOutlinedIcon',
    menus: [
      {
        id: 41,
        text: '权限管理',
        description: '权限管理',
        path: '/admin/system/authroization',
        icon: 'SecurityOutlinedIcon',
        menus: [
          {
            id: 411,
            text: '管理员列表',
            description: '管理员列表',
            path: '/admin/system/administrator',
            icon: 'SupervisorAccountOutlinedIcon'
          },
          {
            id: 412,
            text: '角色列表',
            description: '角色列表',
            path: '/admin/system/role',
            icon: 'AccessibilityOutlinedIcon'
          }
        ]
      }
    ]
  }
];

export default MENUS;
