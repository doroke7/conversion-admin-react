let ADMIN_MENUS: any = [
  {
    id: 1,
    name: '应用模块',
    description: '应用模块',
    path: '/admin/application',
    icon: 'AccountBoxIcon', // icon 使用文字型的， 这种格式对于 后端 JSON 文本数据兼容性更好
    adminMenus: [
      {
        id: 11,
        name: '應用列表',
        description: '会员列表',
        path: '/admin/resource/app',
        icon: 'AssignmentIndOutlinedIcon'
      }
    ]
  },
  {
    id: 4,
    name: '權限模塊',
    description: '系统管理',
    path: '/admin/authorization',
    icon: 'BuildIcon',
    adminMenus: [
      {
        id: 41,
        name: '角色列表',
        description: '角色列表',
        path: '/admin/resource/admin-role',
        icon: 'SecurityOutlinedIcon',
        adminMenus: [
          // {
          //   id: 411,
          //   name: '管理列表',
          //   description: '管理列表',
          //   path: '/admin/resource/admin-administrator/index/app-id/4',
          //   icon: 'SupervisorAccountOutlinedIcon'
          // },
          // {
          //   id: 412,
          //   name: '角色列表',
          //   description: '角色列表',
          //   path: '/admin/resource/admin-role/index/app-id/4',
          //   icon: 'AccessibilityOutlinedIcon'
          // }
        ]
      },
 
    ]
  }
];

export default ADMIN_MENUS;
