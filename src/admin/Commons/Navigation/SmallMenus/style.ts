import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      color: grey[100]
    },
    rootHidden: {
      display: 'none'
    },
    listItemIcon: {
      minWidth: oTheme.spacing(3),
      marginRight: oTheme.spacing(1),
      color: grey[100]
    },
    listItem: {
      height: oTheme.spacing(6)
    },
    popover: {
      pointerEvents: 'none'
      /**
       * Title： 非常重要的 CSS 属性， 代表 弹跳 区域 能被滑鼠 穿透，进而 使用 mouseEnter, mouseLeave 等交互
       */
    }
  })
);

export default oStyle;
