import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  lightBlue,
  blue,
  blueGrey,
  grey,
  deepPurple,
  indigo,
  pink,
  red,
  purple,
  orange,
  green
} from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      top: 0,
      width: '100vw',
      zIndex: 3000, // Material=UI 的 AppBar 为 zIndex: 1201,
      '& .MuiLinearProgress-colorPrimary': {
        backgroundColor: purple['200']
      },
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: purple['900']
      }
    }
  })
);

export default oStyle;
