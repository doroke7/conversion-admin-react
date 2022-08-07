import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, indigo, blue } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    right: {
      position: 'absolute',
      right: oTheme.spacing(2)
    },
    iconButton: {
      display: 'inline-block',
      verticalAlign: 'middle',
      height: oTheme.spacing(5),
      width: oTheme.spacing(5),
      padding: oTheme.spacing(0),
      marginRight: oTheme.spacing(1),
      backgroundColor: pink['A700'],
      '&:hover': {
        backgroundColor: pink['800']
      },
      border: `1px solid ${oTheme.palette.background.paper}`,
      boxSizing: 'border-box'
    },

    icon: {
      color: oTheme.palette.background.paper
    },
    iconAnimation: {
      animation:
        '$rotation 0.5s 1 ease-in-out reverse, $rotation 0.2s 4 linear reverse, $rotation 0.5s 1 linear reverse'
    },
    '@keyframes rotation': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    },
    avatarWrapper: {
      display: 'inline-block',
      verticalAlign: 'middle',
      cursor: 'pointer'
    },
    avatar: {
      border: `2px solid ${oTheme.palette.background.paper}`,
      boxSizing: 'border-box'
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
