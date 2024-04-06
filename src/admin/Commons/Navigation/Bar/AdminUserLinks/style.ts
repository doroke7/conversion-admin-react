import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, indigo, blue } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      marginLeft: -oTheme.spacing(1),
      [oTheme.breakpoints.down('sm')]: {
        // display: 'none'
      },
      [oTheme.breakpoints.down('xs')]: {
        // display: 'none'
      }
    },
    toolTip: {
      cursor: 'pointer'
    },
    iconButton: {
      position: 'relative',
      color: grey[100],
      minWidth: oTheme.spacing(5),
      minHeight: oTheme.spacing(5),
      marginRight: oTheme.spacing(0),
      borderRadius: '50%',
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.12)'
      },
      [oTheme.breakpoints.down('xs')]: {
        '&:nth-child(n+3)': {
          display: 'none'
        }
      },
      [oTheme.breakpoints.down('sm')]: {
        '&:nth-child(n+6)': {
          display: 'none'
        }
      },
      [oTheme.breakpoints.down('md')]: {
        '&:nth-child(n+8)': {
          display: 'none'
        }
      },
      [oTheme.breakpoints.down('lg')]: {
        '&:nth-child(n+10)': {
          display: 'none'
        }
      }
    },
    icon: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate( -50%, -50%)',
      minWidth: oTheme.spacing(3),
      minHeight: oTheme.spacing(3)
    }
  })
);

export default style;
