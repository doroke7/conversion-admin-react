import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: oTheme.palette.background.paper,
      '& .MuiTab-root': {
        [oTheme.breakpoints.up('sm')]: {
          minWidth: oTheme.spacing(5)
        }
      }
    },
    tab: {
      position: 'relative',
      paddingRight: oTheme.spacing(6),
      // borderLeft: '1px solid ' + grey[300],
      cursor: 'pointer',
      '&.Mui-selected': {
        background: grey[50] + ' ' + '!important'
      },
      '&:hover': {
        background: grey[200],
        '& .MuiIconButton-root': {
          opacity: 1,
          borderRadius: '20%'
        }
      }
    },
    iconButton: {
      position: 'absolute',
      right: oTheme.spacing(0.5),
      top: '50%',
      transform: 'translate(0%, -50%) scale(0.8)',
      color: grey[400],
      opacity: 0
    }
  })
);

export default oStyle;

// csq
