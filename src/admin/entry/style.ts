import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, indigo, blue } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
    },
    test: {
      animation: '$fade 1s linear 0s 1 normal, $slide 0.5s ease-out 0.2s 1 normal'
    },
    '@keyframes fade': {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    },
    '@keyframes slide': {
      '0%': {
        transform: 'translateY(-60%)'
      },
      '100%': {
        transform: 'translateY(0%)'
      }
    }
  })
);

export default style;
