import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
      position: 'relative',
      backgroundImage:
        'radial-gradient(' +
        grey[50] +
        ' 0%, ' +
        grey[50] +
        ' 10%, ' +
        grey[200] +
        ' 60%, ' +
        grey[400] +
        ' 90%, ' +
        grey[500] +
        ' 100%)'
    },
    wrapper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, calc( -50% - 16px))'
    },
    buttonWrapper: {
      overflow: 'hidden'
    },
    button: {
      width: oTheme.spacing(36),
      fontSize: oTheme.spacing(6),
      display: 'block',
      margin: '0px' + ' auto 0px auto',
      borderRadius: oTheme.spacing(6)
    }
  })
);

export default oStyle;
