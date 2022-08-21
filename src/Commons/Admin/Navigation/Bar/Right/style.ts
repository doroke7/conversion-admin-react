import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightGreen, indigo, blue } from '@material-ui/core/colors';

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
      backgroundColor: oTheme.palette.background.paper,
      '&:hover': {
        backgroundColor: grey[300]
      },
      border: '1px solid ' + pink['A700'],
      boxSizing: 'border-box'
    },

    icon: {
      verticalAlign: 'middle',
      fill: 'currentColor',
      overflow: 'hidden',
      color: pink['A700']
    },
    iconAnimation: {
      animation: '$rotation 1.2s cubic-bezier(.78,.01,.01,.78) 0s 1'
    },
    '@keyframes rotation': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(1440deg)'
      }
    },
    avatarWrapper: {
      display: 'inline-block',
      verticalAlign: 'middle',
      cursor: 'pointer'
    },
    avatar: {
      border: `2px solid ${oTheme.palette.background.paper}`,
      boxSizing: 'border-box',
      backgroundColor: grey[700]
    },
    badge: {
      '& .MuiBadge-badge': {
        backgroundColor: lightGreen['A700'],
        color: lightGreen['A700'],
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
