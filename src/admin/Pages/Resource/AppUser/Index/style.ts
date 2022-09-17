import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    dialogForSearch: {
      display: 'none',
      [oTheme.breakpoints.down('sm')]: {
        display: 'inherit'
      },
      '& .MuiDialogActions-root': {
        padding:
          oTheme.spacing(1) + 'px ' + oTheme.spacing(3) + 'px ' + oTheme.spacing(2) + 'px ' + oTheme.spacing(3) + 'px '
      }
    },
    dialogForPage: {
      display: 'none',
      [oTheme.breakpoints.down('sm')]: {
        display: 'inherit'
      },
      '& .MuiDialogActions-root': {
        padding:
          oTheme.spacing(1) + 'px ' + oTheme.spacing(3) + 'px ' + oTheme.spacing(2) + 'px ' + oTheme.spacing(3) + 'px '
      }
    },
    submitButton: {
      width: oTheme.spacing(12),
      [oTheme.breakpoints.down('sm')]: {
        width: '100%',
        height: oTheme.spacing(7)
      }
    },
    closeButton: {
      position: 'absolute',
      right: oTheme.spacing(2),
      top: oTheme.spacing(2),
      width: oTheme.spacing(4),
      height: oTheme.spacing(4),
      borderRadius: oTheme.spacing(0.5)
    },

    cards: {
      display: 'none',
      [oTheme.breakpoints.down('sm')]: {
        display: 'inherit',
        maxWidth: 'calc( 100% - ' + oTheme.spacing(7) + 'px )'
      }
    },
    dataGridWrapper: {
      [oTheme.breakpoints.down('sm')]: {
        display: 'none'
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
      maxHeight: 652,
      '& .MuiDataGrid-row:last-child': {
        '& .MuiDataGrid-cell': {
          borderBottom: 'none'
        }
      }
    },

    formControl: {
      width: oTheme.spacing(12),
      marginRight: oTheme.spacing(2),
      [oTheme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },

    paginationWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginRight: oTheme.spacing(1),
      marginTop: oTheme.spacing(1),
      paddingTop: oTheme.spacing(1),
      [oTheme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        bottom: '0%',
        right: '0%',
        height: 'calc( 100vh - ' + oTheme.spacing(7) + 'px )',
        marginTop: oTheme.spacing(0),
        paddingTop: oTheme.spacing(0),
        transform: 'translate(0%, 0%)',
        '& .MuiPagination-ul': {
          flexDirection: 'column'
        },
        '& .MuiPaginationItem-root': {
          margin: '3px 3px'
        }
      }
    },
    pagination: {
      marginRight: oTheme.spacing(2),
      [oTheme.breakpoints.down('sm')]: {
        marginRight: oTheme.spacing(0),
        marginTop: -oTheme.spacing(2)
      }
    },
    searchButton: {
      border: '1px solid ' + grey[400],
      width: oTheme.spacing(4),
      height: oTheme.spacing(4),
      display: 'none',
      [oTheme.breakpoints.down('sm')]: {
        display: 'inherit',
        marginTop: oTheme.spacing(2)
      }
    },
    pageButton: {
      border: '1px solid ' + grey[400],
      width: oTheme.spacing(4),
      height: oTheme.spacing(4),
      display: 'none',
      [oTheme.breakpoints.down('sm')]: {
        display: 'inherit',
        marginBottom: oTheme.spacing(2)
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
