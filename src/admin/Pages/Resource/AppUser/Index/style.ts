import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    dataGridWrapper: {
      [oTheme.breakpoints.down('sm')]: {
        width: 'calc( 100% - ' + oTheme.spacing(6) + 'px)'
      },
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
      minHeight: 652,
      maxHeight: 652
    },
    dataGrid10: {
      '& .MuiDataGrid-row[data-rowindex="9"]': {
        '& .MuiDataGrid-cell': {
          borderBottom: 'none'
        }
      }
    },
    dataGrid20: {
      '& .MuiDataGrid-row[data-rowindex="19"]': {
        '& .MuiDataGrid-cell': {
          borderBottom: 'none'
        }
      }
    },
    dataGrid50: {
      '& .MuiDataGrid-row[data-rowindex="49"]': {
        '& .MuiDataGrid-cell': {
          borderBottom: 'none'
        }
      }
    },
    dataGrid100: {
      '& .MuiDataGrid-row[data-rowindex="99"]': {
        '& .MuiDataGrid-cell': {
          borderBottom: 'none'
        }
      }
    },
    paginationWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginRight: oTheme.spacing(1),
      marginTop: oTheme.spacing(1),
      paddingTop: oTheme.spacing(1),
      [oTheme.breakpoints.down('sm')]: {
        position: 'fixed',
        top: '50%',
        right: '0%',
        transform: 'translate(0%, -50%)',
        '& .MuiPagination-ul': {
          flexDirection: 'column'
        },
        '& .MuiPaginationItem-root': {
          margin: '3px 3px'
        }
      }
    },
    pagination: {
      marginRight: oTheme.spacing(4),
      [oTheme.breakpoints.down('sm')]: {
        marginRight: oTheme.spacing(0)
      }
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

    formControl: {
      width: oTheme.spacing(12),
      marginRight: oTheme.spacing(4),
      [oTheme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    page: {
      [oTheme.breakpoints.down('sm')]: {
        display: 'none'
      },
      color: grey['600'],
      '& .pre': {
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
        verticalAlign: 'middle'
      }
    }
  })
);

export default style;
