import SupervisedUserCircleTwoToneIcon from '@material-ui/icons/SupervisedUserCircleTwoTone';
import CloudDoneTwoToneIcon from '@material-ui/icons/CloudDoneTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';

const MENUS: any = {
  '/admin/resource/domain/index': {
    text: '域名',
    description: '移動端使用的域名列表',
    path: '/admin/resource/domain/index',
    Icon: CloudDoneTwoToneIcon
  },
  '/admin/resource/user/index': {
    text: '會員',
    description: '聊天室的會員列表',
    path: '/admin/resource/user/index',
    Icon: FaceTwoToneIcon
  },
  '/admin/resource/administrator/index': {
    text: '管理員',
    description: '管理員列表',
    path: '/admin/resource/administrator/index',
    Icon: SupervisedUserCircleTwoToneIcon
  }
};

export default MENUS;
