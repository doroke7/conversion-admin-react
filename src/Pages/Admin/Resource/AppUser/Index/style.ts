import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    dataGridWrapper: {
      width: '100%',
      '& .MuiDataGrid-root': {
        '& .MuiDataGrid-overlay': {
          background: grey[50]
        }
      }
    },
    dataGrid: {
      minHeight: oTheme.spacing(7.25) * 11,
      borderBottom: '0px solid #fff'
    },
    paginationWrapper: {
      marginTop: oTheme.spacing(4)
    },
    avatar: {
      background: grey[50],
      border: '1px ' + grey[400] + ' solid'
    },
    vipIcon: {
      transform: ' rotate(45deg)',
      filter: 'drop-shadow( 0px 2px 2px rgba(0, 0, 0, .7))'
    },
    phoneTypeIcon: {
      width: oTheme.spacing(4),
      height: oTheme.spacing(4)
    }
  })
);

export default style;
