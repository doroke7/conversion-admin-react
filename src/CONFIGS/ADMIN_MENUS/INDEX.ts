let ADMIN_MENUS: any = [
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
        path: '/admin/resource/app-user/app-id/4',
        icon: 'AssignmentIndOutlinedIcon'
      },
      {
        id: 12,
        text: '订单列表',
        description: '订单列表',
        path: '/admin/resource/order-info/index/app-id/4',
        icon: 'EventNoteIcon'
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
        path: '/admin/system/authroization/index/app-id/4',
        icon: 'SecurityOutlinedIcon',
        menus: [
          {
            id: 411,
            text: '管理列表',
            description: '管理列表',
            path: '/admin/resource/admin-administrator/index/app-id/4',
            icon: 'SupervisorAccountOutlinedIcon'
          },
          {
            id: 412,
            text: '角色列表',
            description: '角色列表',
            path: '/admin/resource/admin-role/index/app-id/4',
            icon: 'AccessibilityOutlinedIcon'
          }
        ]
      },
      {
        id: 42,
        text: '后台管理',
        description: '后台管理',
        path: '/admin/system/authroization/index/app-id/4',
        icon: 'SecurityOutlinedIcon',
        menus: [
          {
            id: 424,
            text: '接口列表',
            description: '接口列表',
            path: '/admin/resource/admin-api/index/app-id/4',
            icon: 'LockOpenOutlinedIcon'
          },
          {
            id: 423,
            text: '路由列表',
            description: '路由列表',
            path: '/admin/resource/admin-route/index/app-id/4',
            icon: 'LockOpenOutlinedIcon'
          },

          {
            id: 425,
            text: '菜单配置',
            description: '菜单配置',
            path: '/admin/resource/admin-link/index',
            icon: 'LockOpenOutlinedIcon'
          },
          {
            id: 426,
            text: '快捷配置',
            description: '快捷配置',
            path: '/admin/resource/admin-link/index',
            icon: 'LockOpenOutlinedIcon'
          }
        ]
      }
    ]
  }
];

export default ADMIN_MENUS;
