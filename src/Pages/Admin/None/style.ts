import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
      position: 'relative',
      backgroundImage: 'radial-gradient(' + grey[50] + ' 0%, ' + grey[200] + '90%, ' + grey[800] + ' 100%)'
    },
    wrapper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    button: {
      fontSize: oTheme.spacing(6),
      display: 'block',
      margin: 'auto'
    }
  })
);

export default oStyle;
