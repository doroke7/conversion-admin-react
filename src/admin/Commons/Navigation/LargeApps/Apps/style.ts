import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      margin: oTheme.spacing(1) + 'px' + ' ' + oTheme.spacing(2) + 'px',
      padding: oTheme.spacing(2) + 'px' + ' ' + oTheme.spacing(0) + 'px',
      borderRadius: oTheme.spacing(0.5),
      animation: '$brighten 0.4s 1 ease-in-out',
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      borderColor: 'rgba(0, 0, 0, 0.23)'
    },
    listItem: {
      paddingLeft: oTheme.spacing(2)
    },
    listItemIcon: {
      minWidth: oTheme.spacing(4),
      color: oTheme.palette.background.paper
    }
  })
);

export default oStyle;
