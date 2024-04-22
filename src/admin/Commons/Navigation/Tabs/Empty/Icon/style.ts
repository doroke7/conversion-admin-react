import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      width: oTheme.spacing(26),
      height: oTheme.spacing(26),
      verticalAlign: 'middle',
      fill: 'currentColor',
      overflow: 'hidden',
      [oTheme.breakpoints.up('sm')]: {
        width: oTheme.spacing(56),
        height: oTheme.spacing(56)
      }
    },

  })
);

export default oStyle;

// csq
