import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const drawerWidth = 200;

const oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none'
    },
    listItemIconFirst: {
      color: grey[200],
      minWidth: oTheme.spacing(3)
    },
    listItemIconSecond: {
      color: grey[600],
      minWidth: oTheme.spacing(3)
    },
    listItemEnable: {
      background: grey[700] + ' !important'
      // grey[xxx] 数值越小 #yyy 越大，  颜色越亮
    },
    listItemFirst: {
      paddingTop: oTheme.spacing(0),
      paddingLeft: oTheme.spacing(1) + 2,
      paddingRight: oTheme.spacing(1) + 0,
      paddingBottom: oTheme.spacing(0),
      '&:hover': {
        background: grey[800]
      },
      cursor: 'pointer',
      background: grey[0]
    },

    listItemSecond: {
      paddingTop: oTheme.spacing(0),
      paddingLeft: oTheme.spacing(2) + 2,
      paddingRight: oTheme.spacing(1) + 0,
      paddingBottom: oTheme.spacing(0),
      '&:hover': {
        background: grey[800]
      },
      cursor: 'pointer',
      background: grey[0]
    },
    listText: {
      color: grey[200],
      marginLeft: oTheme.spacing(1) + 4
    },

    expandMore: {
      color: grey[400] + ' !important'
    },
    expandLess: {
      color: grey[400] + ' !important'
    },
    arrowRightIcon: {
      color: grey[400] + ' !important'
    }
  })
);

export default oStyle;
