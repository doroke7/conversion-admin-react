import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

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
        background: grey[50] + ' ' + '!important',
        fontWeight: 900,
        '& .MuiListItemIcon-root': {
          color: indigo[500] // indigo[500] 与 Tab 下方底线相同
        }
      },
      '&:hover': {
        background: grey[200],
        '& .MuiIconButton-root': {
          opacity: 1,
          borderRadius: '20%'
        }
      }
    },
    listItemIcon: {
      minWidth: oTheme.spacing(3),
      marginRight: oTheme.spacing(1),
      verticalAlign: 'middle'
    },
    listITemText: {
      verticalAlign: 'middle'
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
