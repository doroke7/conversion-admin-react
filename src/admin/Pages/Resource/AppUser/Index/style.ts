import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, common, indigo, lightBlue } from '@material-ui/core/colors';

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
      minWidth: oTheme.spacing(12),
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
    dataGridWrapper: {
      marginTop: oTheme.spacing(1),
      [oTheme.breakpoints.down('sm')]: {
        display: 'none'
      },
      width: '100%',
      '& .MuiDataGrid-root': {
        '& .MuiDataGrid-overlay': {
          backgroundColor: 'rgba(250, 250, 250, 0)'
        }
      },
      '& .MuiDataGrid-columnsContainer': {
        zIndex: 1
      },
      '& .MuiDataGrid-footerContainer': {
      },
      '& .MuiDataGrid-dataContainer': {
      },
      '& .MuiDataGrid-window': {
        scrollbarWidth: 'thin',
        background: 'linear-gradient(180deg, #f3f3f3 50%, #ffffff 65%, #ffffff 75%, #f3f3f3 90%)',
        overflowX: 'hidden'
      },
      '&  .MuiDataGrid-row': {
        background: '#FFFFFF',

        '&:hover': {
          background: '#F2F2F2'
        }
      }
    },
    dataGrid: {
      minHeight: 'calc( 100vh - ' + oTheme.spacing(21) + 'px )',
      maxHeight: 'calc( 100vh - ' + oTheme.spacing(21) + 'px )',
      '& .MuiDataGrid-row:last-child': {
        '& .MuiDataGrid-cell': {
          // borderBottom: 'none'
        }
      },
      '& .MuiIconButton-label': {
        '& .MuiSvgIcon-root': {
          fontSize: '1rem'
        }
      }
    },
    avatar: {
      width: oTheme.spacing(3),
      height: oTheme.spacing(3),

    },

    formControl: {
      textAlign: 'right',
      width: oTheme.spacing(9),
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -5px) scale(0.65)'
      },
      '& .MuiInputBase-root': {
        fontSize: oTheme.spacing(1.75),
      },
      marginRight: oTheme.spacing(2),
      [oTheme.breakpoints.down('sm')]: {
        display: 'none'
      },
      '& .MuiOutlinedInput-input': {
        paddingTop: oTheme.spacing(0.6),
        paddingBottom: oTheme.spacing(0.6),
      },
    },
    menuItem: {
      fontSize: oTheme.spacing(1.75),
      lineHeight: 1.25,
    },

    paginationWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginRight: oTheme.spacing(0),
      marginBottom: oTheme.spacing(1),
      [oTheme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        bottom: '0%',
        right: '0%',
        width: oTheme.spacing(7),
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
        width: oTheme.spacing(4),
        verticalAlign: 'middle',
        '& input': {
          textAlign: 'right'
        }
      },
      '& .next': {
        verticalAlign: 'middle',
        fontSize: oTheme.spacing(1.75),

      }
    },
    textField: {
      width: oTheme.spacing(8),
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -5px) scale(0.65)'
      },
      '& .MuiOutlinedInput-root': {
        height: oTheme.spacing(3.25),
      },
      '& .MuiInputBase-input': {
        textAlign: 'right',
        fontSize: oTheme.spacing(1.75),
      },

    },
    sort:{
      position: 'relative',
      color: common['white'],
      fontWeight: 900,
      fontSize: oTheme.spacing(2.5),
      boxSizing: 'border-box',
      textAlign: 'center',
      width: oTheme.spacing(3.8),
      height: oTheme.spacing(3.8),
      lineHeight: oTheme.spacing(3.8) + 'px',
      background: lightBlue[500],
      border: '2px solid ' + grey[700],
      animation: '',
    },
    sort01: {
      background: lightBlue[900],

    },
    sort11:{
      background: lightBlue[800],
    },
    sort21:{
      background: lightBlue[700],
    },
    sort31:{
      background: lightBlue[600],
    },
    sort41:{
      background: lightBlue[500],
    },
    sort51:{
      background: lightBlue[400],
    },
    sort61:{
      background: lightBlue[300],
    },
    sort71:{
      background: lightBlue[200],
    },
    sort81:{
      background: lightBlue[100],
    },
    sort91:{
      background: lightBlue[50],
    }
  })
);

export default style;
