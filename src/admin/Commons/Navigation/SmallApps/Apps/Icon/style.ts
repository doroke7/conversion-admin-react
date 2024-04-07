import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      fontSize: oTheme.spacing(2),
      width: oTheme.spacing(3),
      height: oTheme.spacing(3),
      boxShadow: '1px 1px 2px 0px #676767b3, 1px 1px 2px 0px #676767b3, 1px 1px 2px 0px #676767b3'
    },
    badge: {
      marginRight: oTheme.spacing(1),
      '& .MuiBadge-badge': {}
    },
    checkCircleIcon: {
      fontSize: oTheme.spacing(1.5),
      color: '#44b700',
      backgroundColor: oTheme.palette.background.paper,
      // borderRadius: '50%',
      boxShadow: `0 0 6px 0px ${oTheme.palette.background.paper}`
      // 四个变量的 boxShadow: X-offset Y-Offset blur spreed
    }
  })
);

export default oStyle;
