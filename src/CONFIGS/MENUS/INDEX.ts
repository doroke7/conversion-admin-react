import SupervisedUserCircleTwoToneIcon from '@material-ui/icons/SupervisedUserCircleTwoTone';
import CloudDoneTwoToneIcon from '@material-ui/icons/CloudDoneTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';

const MENUS: any = {
  '/admin/resource/domain/do': {
    text: '域名',
    description: '移動端使用的域名列表',
    path: '/admin/resource/domain/do',
    Icon: CloudDoneTwoToneIcon
  },
  // '/admin/resource/room': {
  //   text: '房間',
  //   description: '聊天室的房間列表',
  //   path: '/admin/resource/room/do',
  //   Icon: FormatListNumberedRtl
  // },
  '/admin/resource/user/do': {
    text: '會員',
    description: '聊天室的會員列表',
    path: '/admin/resource/user/do',
    Icon: FaceTwoToneIcon
  },
  '/admin/resource/administrator/do': {
    text: '管理員',
    description: '管理員列表',
    path: '/admin/resource/administrator/do',
    Icon: SupervisedUserCircleTwoToneIcon
  }
  // '/admin/resource/word/do': {
  //   text: '禁止字',
  //   description: '禁止字列表',
  //   path: '/admin/resource/word',
  //   Icon: HighlightOff
  // }
};

export default MENUS;
