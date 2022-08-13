let MENUS: any = [
  {
    id: 1,
    text: '会员管理',
    description: '会员管理',
    path: '/admin/app-user/index',
    icon: 'AccountBoxIcon', // icon 使用文字型的， 这种格式对于 后端 JSON 文本数据兼容性更好
    menus: [
      {
        id: 11,
        text: '会员列表',
        description: '会员列表',
        path: '/admin/resource/app-user/index/app-id/:appId/page/:page/limit/:limit',
        icon: 'AssignmentIndOutlinedIcon'
      },
      {
        id: 12,
        text: '订单列表',
        description: '订单列表',
        path: '/admin/resource/order-info/index/app-id/:appId/page/:page/limit/:limit',
        icon: 'EventNoteIcon'
      }
    ]
  },
  {
    id: 3,
    text: '平台管理',
    description: '平台管理',
    path: '/admin/config/index',
    icon: 'DashboardIcon',
    menus: [
      {
        id: 31,
        text: '平台配置',
        description: '平台配置',
        path: '/admin/resource/config/index/app-id/:appId/page/:page/limit/:limit',
        icon: 'BorderAllOutlinedIcon'
      },
      {
        id: 32,
        text: '商品列表',
        description: '商品列表',
        path: '/admin/resource/product-info/index/app-id/:appId/page/:page/limit/:limit',
        icon: 'LocalAtmOutlinedIcon'
      }
    ]
  },
  {
    id: 5,
    text: '视频管理',
    description: '资源管理',
    path: '/admin/vod/index',
    icon: 'MovieCreationOutlinedIcon',
    menus: [
      {
        id: 51,
        text: '剧集列表',
        description: '剧集列表',
        path: '/admin/resource/vod/index/app-id/:appId/page/:page/limit/:limit',
        icon: 'VideocamOutlinedIcon'
      },
      {
        id: 52,
        text: '域名列表',
        description: '域名列表',
        path: '/admin/resource/domain-name/index/app-id/:appId/page/:page/limit/:limit',
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
        path: '/admin/resource/advertisement1/index/app-id/:appId/page/:page/limit/:limit',
        icon: 'DehazeIcon'
      },
      {
        id: 22,
        text: '跑马广告',
        description: '跑马广告',
        path: '/admin/resource/advertisement2/index/app-id/:appId/page/:page/limit/:limit',
        icon: 'DehazeIcon'
      },
      {
        id: 23,
        text: '轮播广告',
        description: '轮播广告',
        path: '/admin/resource/advertisement3/index/app-id/:appId/page/:page/limit/:limit',
        icon: 'DehazeIcon'
      },
      {
        id: 24,
        text: '公告广告',
        description: '公告广告',
        path: '/admin/resource/advertisement4/index/app-id/:appId/page/:page/limit/:limit',
        icon: 'DehazeIcon'
      },
      {
        id: 26,
        text: '插屏广告',
        description: '插屏广告',
        path: '/admin/resource/advertisement5/index/app-id/:appId/page/:page/limit/:limit',
        icon: 'DehazeIcon'
      }
    ]
  },
  {
    id: 4,
    text: '系统管理',
    description: '系统管理',
    path: '/admin/system/index',
    icon: 'BuildIcon',
    menus: [
      {
        id: 41,
        text: '权限管理',
        description: '权限管理',
        path: '/admin/system/authroization/index',
        icon: 'SecurityOutlinedIcon',
        menus: [
          {
            id: 411,
            text: '管理员列表',
            description: '管理员列表',
            path: '/admin/resource/administrator/index',
            icon: 'SupervisorAccountOutlinedIcon'
          },
          {
            id: 412,
            text: '角色列表',
            description: '角色列表',
            path: '/admin/resource/role/index',
            icon: 'AccessibilityOutlinedIcon'
          },
          {
            id: 413,
            text: '权限配置',
            description: '权限配置',
            path: '/admin/resource/authorization/index',
            icon: 'LockOpenOutlinedIcon'
          }
        ]
      }
    ]
  }
];

export default MENUS;
