import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animation: '$warn 0.1s ease-in-out 0.1s 3 alternate'
    },
    text: {
      textAlign: 'center',
      fontWeight: 900,
      color: grey[500],
      fontSize: oTheme.spacing(4)
    },
    '@keyframes warn': {
      '0%': {
        transform: 'translate(-50%, calc(-50% - 8px))'
      },
      '67%': {
        transform: 'translate(-50%, calc(-50% + 8px))'
      },
      '100%': {
        transform: 'translate(c-50%, -50%)'
      }
    }
  })
);

export default style;
