let ADMIN_MENUS: any = [
  {
    id: 3,
    name: '应用模块',
    description: '应用模块',
    path: '/admin/application',
    icon: 'LineWeightIcon', // icon 使用文字型的， 这种格式对于 后端 JSON 文本数据兼容性更好
    adminMenus: [
      {
        id: 31,
        name: '应用列表',
        description: '应用列表',
        path: '/admin/resource/app',
        icon: 'DragHandleIcon'
      },
      {
        id: 32,
        name: '帳号列表',
        description: '帳号列表',
        path: '/admin/resource/app-user',
        icon: 'DragHandleIcon'
      }
    ]
  },
  {
    id: 4,
    name: '權限模块',
    description: '權限模块',
    path: '/admin/authorization',
    icon: 'LineWeightIcon',
    adminMenus: [
      {
        id: 41,
        name: '角色列表',
        description: '角色列表',
        path: '/admin/resource/admin-role',
        icon: 'DragHandleIcon',
        adminMenus: []
      },
      {
        id: 42,
        name: '用戶列表',
        description: '用戶列表',
        path: '/admin/resource/admin-user',
        icon: 'DragHandleIcon',
        adminMenus: []
      }
    ]
  }
];

export default ADMIN_MENUS;
