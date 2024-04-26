import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      zIndex: 1,
      opacity: 0.7,
      flexDirection: 'column',
      height: 'calc(100% - ' + oTheme.spacing(4.5) + 'px)'
    },
    icon: {
      width: oTheme.spacing(10),
      height: oTheme.spacing(10)
    }
  })
);

export default oStyle;
