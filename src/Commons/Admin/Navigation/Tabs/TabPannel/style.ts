import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      height: 'calc( 100% - ' + oTheme.spacing(6) + 'px )',
      width: '100%'
    }
  })
);

export default oStyle;
