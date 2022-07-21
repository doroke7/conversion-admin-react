import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

const oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      width: oTheme.spacing(4),
      height: oTheme.spacing(4)
    },
    badge: {
      marginRight: oTheme.spacing(2),
      '& .MuiBadge-badge': {}
    },
    checkCircleIcon: {
      fontSize: oTheme.spacing(2),
      color: '#44b700'
    }
  })
);

export default oStyle;
