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
      },
      '& .MuiDataGrid-footerContainer': {
        background: grey[50]
      }
    },
    dataGrid: {
      minHeight: oTheme.spacing(8) * 11,
      maxHeight: oTheme.spacing(8) * 11
    },
    paginationWrapper: {
      display: 'flex',
      flexDirection: 'row',
      marginRight: oTheme.spacing(1)
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
    },
    pagination: {
      marginRight: oTheme.spacing(4)
    },
    formControl: {
      width: oTheme.spacing(12),
      marginRight: oTheme.spacing(4)
    },
    page: {
      // width: oTheme.spacing(4)
      '& .pre': {
        color: grey['600'],
        verticalAlign: 'middle'
      },
      '& .MuiTextField-root': {
        width: oTheme.spacing(6),
        verticalAlign: 'middle',
        '& input': {
          textAlign: 'right'
        }
      },
      '& .next': {
        color: grey['600'],
        verticalAlign: 'middle'
      }
    }
  })
);

export default style;
