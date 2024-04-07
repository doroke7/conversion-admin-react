import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { grey, pink, cyan, lightBlue, deepPurple, indigo, blue, purple } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: oTheme.spacing(40),
      color: grey[100],
      zIndex: -1
    },
    title: {
      marginLeft: oTheme.spacing(2),
      fontWeight: 900,
      color: '#ffffff',
      userSelect: 'none',
      textShadow:
        '1px 1px 2px #4dd0e1, -1px -1px 2px #4dd0e1, -1px 1px 2px #4dd0e1, 1px -1px 2px #4dd0e1, 1px 0px 2px #4dd0e1, 0px 1px 2px #4dd0e1, -1px 0px 2px #4dd0e1, 0px -1px 2px #4dd0e1'
    },
    rootHidden: {
      display: 'none'
    },
    listItemIcon: {
      minWidth: oTheme.spacing(3),
      marginRight: oTheme.spacing(1),
      color: grey[100]
    },
    icon: {
      filter:
        'drop-shadow( 1px 1px 0px rgba(0, 0, 0, 0.8)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4)) drop-shadow( 0px 0px 0px rgba(0, 0, 0, 0.4))'
    },
    listItem: {
      height: oTheme.spacing(6)
    }
  })
);

export default oStyle;
