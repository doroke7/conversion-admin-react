import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, indigo, blue } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      background: 'linear-gradient(308deg, #fbfbfb, #eeeeee)',
      backgroundSize: '400% 400%',
        animation: 'animationGradient 12s ease infinite',
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
    },
    '@keyframes $animationGradient': {
      '0%': {backgroundPosition: '2% 0%'},
      '50%': {backgroundPosition: '99% 100%'},
      '100%': {backgroundPosition: '2% 0%'},
    }
  })
);

export default style;
