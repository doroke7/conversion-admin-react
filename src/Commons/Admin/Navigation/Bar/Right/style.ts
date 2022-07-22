import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    right: {
      position: 'absolute',
      right: oTheme.spacing(2)
    },
    avatarWrapper: {
      cursor: 'pointer'
    },
    badge: {
      '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${oTheme.palette.background.paper}`,
        '&::after': {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          animation: '$ripple 1s infinite ease-in-out',
          border: '1px solid currentColor',
          content: '""'
        }
      }
    },

    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  })
);

export default style;
