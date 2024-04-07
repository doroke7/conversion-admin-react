import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { lightBlue, blue, blueGrey, grey, deepPurple, indigo, pink, red } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      flexGrow: 1,
      width: '100%',
      minHeight: 'calc( 100vh )',
      maxHeight: 'calc( 100vh )',
      backgroundColor: oTheme.palette.background.paper,
      '& .MuiTab-root': {
        [oTheme.breakpoints.up('sm')]: {
          minWidth: oTheme.spacing(5)
        }
      }
    },
    mainNone: {
      display: 'none'
    },
    tabs: {
      marginTop: oTheme.spacing(7),
      '& .MuiTabScrollButton-root': {
        opacity: 1,
        background: grey[200],
        '&:hover': {
          background: grey[300]
        }
      },
      [oTheme.breakpoints.down('sm')]: {
        display: 'none'
      },
      [oTheme.breakpoints.down('xs')]: {
        display: 'none'
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
        borderRadius: oTheme.spacing(0.75),
        color: grey[400]
      }
    },
    listItemIcon: {
      minWidth: oTheme.spacing(3),
      marginRight: oTheme.spacing(1),
      verticalAlign: 'middle'
    },
    listITemText: {
      verticalAlign: 'middle',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    listITemText0: {
      maxWidth: oTheme.spacing(0) * 0.92
    },
    listITemText1: {
      maxWidth: oTheme.spacing(2) * 0.92
    },
    listITemText2: {
      maxWidth: oTheme.spacing(4) * 0.92
    },
    listITemText3: {
      maxWidth: oTheme.spacing(6) * 0.92
    },
    listITemText4: {
      maxWidth: oTheme.spacing(8) * 0.92
    },
    iconButton: {},
    tooltip: {
      background: 'linear-gradient(195deg, ' + grey[900] + ' 30%, ' + grey[800] + ' 90%)'
    },
    emptyNone: {
      display: 'none'
    }
  })
);

export default oStyle;

// csq
