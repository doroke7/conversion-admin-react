import AccountBox from '@material-ui/icons/AccountBox';
import FormatListNumberedRtl from '@material-ui/icons/FormatListNumberedRtl';
import HighlightOff from '@material-ui/icons/HighlightOff';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';

const MENUS: any = {
  domain: {
    text: '域名',
    description: '移動端使用的域名列表',
    path: '/domain',
    Icon: FilterDramaIcon
  },
  room: {
    text: '房間',
    description: '聊天室的房間列表',
    path: '/room',
    Icon: FormatListNumberedRtl
  },
  user: {
    text: '會員',
    description: '聊天室的會員列表',
    path: '/user',
    Icon: AccountBox
  },
  administrator: {
    text: '管理員',
    description: '管理員列表',
    path: '/administrator',
    Icon: SupervisedUserCircle
  },
  word: {
    text: '禁止字',
    description: '禁止字列表',
    path: '/word',
    Icon: HighlightOff
  }
};

export default MENUS;
