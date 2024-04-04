import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
      display: 'block',
      shapeRendering: 'auto'
    },
    fill1: {
      fill: blue[300]
    },
    fill2: {
      fill: blue[200]
    },
    fill3: {
      fill: blue[100]
    }
  })
);

export default oStyle;
