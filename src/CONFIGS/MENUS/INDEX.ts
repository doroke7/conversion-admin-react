import SupervisedUserCircleTwoToneIcon from '@material-ui/icons/SupervisedUserCircleTwoTone';
import CloudDoneTwoToneIcon from '@material-ui/icons/CloudDoneTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';

let MENUS: any = [
  {
    id: 1,
    text: '域名',
    description: '移動端使用的域名列表',
    path: '/admin/resource/domain/index',
    Icon: CloudDoneTwoToneIcon
  },
  {
    id: 2,
    text: '會員',
    description: '聊天室的會員列表',
    path: '/admin/resource/user/index',
    Icon: FaceTwoToneIcon
  },
  {
    id: 3,
    text: '系统管理',
    description: '系统管理菜单',
    path: '/admin/system',
    Icon: SupervisedUserCircleTwoToneIcon,
    menus: [
      {
        id: 4,
        text: '管理員',
        description: '管理員列表',
        path: '/admin/resource/administrator/index',
        Icon: SupervisedUserCircleTwoToneIcon
      }
    ]
  },
  {
    id: 5,
    text: '其他',
    description: '其他',
    path: '/admin/other',
    Icon: SupervisedUserCircleTwoToneIcon,
    menus: [
      {
        id: 6,
        text: '其他AA',
        description: '其他A',
        path: '/admin/resource/admiddddd/index',
        Icon: SupervisedUserCircleTwoToneIcon
      }
    ]
  }
];

export default MENUS;
