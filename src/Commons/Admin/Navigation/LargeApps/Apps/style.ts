import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

const drawerWidth = 200;

const oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      background: blue[200],
      margin: oTheme.spacing(1) + 'px' + ' ' + oTheme.spacing(2) + 'px',
      padding: oTheme.spacing(2) + 'px' + ' ' + oTheme.spacing(0) + 'px',
      borderRadius: oTheme.spacing(0.5),
      animation: '$brighten 0.4s 1 ease-in-out',
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      borderColor: 'rgba(0, 0, 0, 0.23)'
    },
    listItem: {
      paddingLeft: oTheme.spacing(2)
    },
    listItemIcon: {
      minWidth: oTheme.spacing(4),
      color: grey[50]
    },
    avatar: {
      width: oTheme.spacing(4),
      height: oTheme.spacing(4),
      marginRight: oTheme.spacing(1),
      background: blue[500]
    },
    '@keyframes brighten': {
      // '0%': {
      //   background: grey[600],
      // },
      // '100%': {
      //   background: grey[50],
    }
  })
);

export default oStyle;
