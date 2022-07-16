import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      flexGrow: 1,
      width: '100%',
      minHeight: 'calc( 100vh - ' + oTheme.spacing(7) + 'px )',
      maxHeight: 'calc( 100vh - ' + oTheme.spacing(7) + 'px )',
      backgroundColor: oTheme.palette.background.paper,
      '& .MuiTab-root': {
        [oTheme.breakpoints.up('sm')]: {
          minWidth: oTheme.spacing(5)
        }
      }
    },
    tab: {
      position: 'relative',
      cursor: 'pointer',
      '&.Mui-selected': {
        background: oTheme.palette.background.paper + ' ' + '!important',
        fontWeight: 900,
        '& .MuiListItemIcon-root': {
          color: indigo[500] // indigo[500] 与 Tab 下方底线相同
        }
      },
      paddingRight: oTheme.spacing(0.5),
      '&:hover': {
        background: grey[200],
        '& .MuiIconButton-root': {
          opacity: 1
        }
      },
      '& .MuiIconButton-root': {
        marginLeft: oTheme.spacing(1),
        opacity: 0,
        borderRadius: '20%',
        color: grey[400]
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
    iconButton: {}
  })
);

export default oStyle;

// csq
