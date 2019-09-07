
import AccountBox from '@material-ui/icons/AccountBox';
import FormatListNumberedRtl from '@material-ui/icons/FormatListNumberedRtl';

const MENUS: any = {
  room: {
    text: '房間',
    description: '聊天室的房間列表',
    path: '/room',
    Icon: FormatListNumberedRtl,
  },
  user: {
    text: '會員',
    description: '聊天室的會員列表',
    path: '/user',
    Icon: AccountBox
    
  },
};

export default MENUS;
