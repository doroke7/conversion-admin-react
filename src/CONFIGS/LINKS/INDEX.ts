let LINKS: any = [
  {
    id: 11,
    text: '会员列表',
    description: '会员列表',
    path: '/admin/resource/app-user/index/app-id/:appId/page/:page/limit/:limit',
    icon: 'AssignmentIndOutlinedIcon' // icon 使用文字型的， 这种格式对于 后端 JSON 文本数据兼容性更好
  },
  {
    id: 12,
    text: '订单列表',
    description: '订单列表',
    path: '/admin/resource/order-info/index/app-id/:appId/page/:page/limit/:limit',
    icon: 'EventNoteIcon'
  },
  {
    id: 31,
    text: '平台配置',
    description: '平台配置',
    path: '/admin/resource/config/index/app-id/:appId/page/:page/limit/:limit',
    icon: 'BorderAllOutlinedIcon'
  },
  {
    id: 51,
    text: '剧集列表',
    description: '剧集列表',
    path: '/admin/resource/vod/index/app-id/:appId/page/:page/limit/:limit',
    icon: 'VideocamOutlinedIcon'
  },
  {
    id: 411,
    text: '管理员列表',
    description: '管理员列表',
    path: '/admin/resource/administrator/index/app-id/:appId/page/:page/limit/:limit',
    icon: 'SupervisorAccountOutlinedIcon'
  }
];

export default LINKS;
