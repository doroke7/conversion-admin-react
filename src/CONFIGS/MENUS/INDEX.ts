import AccountBox from '@material-ui/icons/AccountBox';
import FormatListNumberedRtl from '@material-ui/icons/FormatListNumberedRtl';
import HighlightOff from '@material-ui/icons/HighlightOff';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import SupervisedUserCircleTwoToneIcon from '@material-ui/icons/SupervisedUserCircleTwoTone';
import CloudDoneTwoToneIcon from '@material-ui/icons/CloudDoneTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
const MENUS: any = {
  '/admin/resource/domain': {
    text: '域名',
    description: '移動端使用的域名列表',
    path: '/admin/resource/domain',
    Icon: CloudDoneTwoToneIcon
  },
  // '/admin/resource/room': {
  //   text: '房間',
  //   description: '聊天室的房間列表',
  //   path: '/admin/resource/room',
  //   Icon: FormatListNumberedRtl
  // },
  '/admin/resource/user': {
    text: '會員',
    description: '聊天室的會員列表',
    path: '/admin/resource/user',
    Icon: FaceTwoToneIcon
  },
  '/admin/resource/administrator': {
    text: '管理員',
    description: '管理員列表',
    path: '/admin/resource/administrator',
    Icon: SupervisedUserCircleTwoToneIcon
  }
  // '/admin/resource/word': {
  //   text: '禁止字',
  //   description: '禁止字列表',
  //   path: '/admin/resource/word',
  //   Icon: HighlightOff
  // }
};

export default MENUS;
