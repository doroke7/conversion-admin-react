import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, red, grey, teal, blue, indigo, lightBlue, common, green, purple, lightGreen } from '@material-ui/core/colors';

const style = makeStyles((oTheme: Theme): any =>
  createStyles({
    top: {
      display: 'grid',
      gridTemplateColumns: '2fr 3fr'
    },
    button: {
      minWidth: oTheme.spacing(8),
      height: oTheme.spacing(3.25),
      [oTheme.breakpoints.down('sm')]: {
        width: '100%',
        height: oTheme.spacing(4)
      }
    },

    textField: {
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -5px) scale(0.65) !important'
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
        transform: 'translate(14px, 7px) scale(0.9)'
      },

      '& .MuiOutlinedInput-root': {
        height: oTheme.spacing(3.25),
      },
      '& .MuiInputBase-input': {
        textAlign: 'left',
        fontSize: oTheme.spacing(1.75),
      },

    },
    textFieldName: {
      width: oTheme.spacing(20),
      marginRight: oTheme.spacing(2),
      '& .MuiInputBase-input': {
        textAlign: 'left',
      },
      [oTheme.breakpoints.down('md')]: {
        width: oTheme.spacing(8),
      },
    },

    textFieldPage: {
      width: oTheme.spacing(8),
      '& .MuiInputBase-input': {
        textAlign: 'right',
      },
    },

    dataGridWrapper: {
      marginTop: oTheme.spacing(1),
      [oTheme.breakpoints.down('sm')]: {
        display: 'none'
      },
      width: '100%',
      '& .MuiDataGrid-root': {
        '& .MuiDataGrid-columnHeader': {
          '&:focus': {
            outline: 'none'
          },
          '&:focus-within': {
            outline: 'none'
          }
        },
        '& .MuiDataGrid-overlay': {
          backgroundColor: 'rgba(250, 250, 250, 0)'
        },
        '& .MuiDataGrid-cell': {
          '&:focus': {
            outline: 'none'
          },
          '&:focus-within': {
            outline: 'none'
          }
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
        // minHeight: 'calc( 100vh - ' + oTheme.spacing(40) + 'px )',
        // maxHeight: 'calc( 100vh - ' + oTheme.spacing(40) + 'px )',
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
    formControlAppUserId: {
      textAlign: 'left',
      width: oTheme.spacing(20),
      [oTheme.breakpoints.down('md')]: {
        width: oTheme.spacing(8),
      },
    },
    formControlLimit: {
      textAlign: 'right',
      width: oTheme.spacing(9),

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
    iconButton: {
      '&.MuiFab-root': {
        boxShadow: 'none',
      },
      width: oTheme.spacing(4.5) - 0.36,
      height: oTheme.spacing(4.5) - 0.36,
      borderRadius: oTheme.spacing(0),
      '& .MuiIconButton-label ': {

        '& .MuiSvgIcon-root': {

        },
      },
      '&.MuiIconButton-root.Mui-disabled': {
        '& .MuiIconButton-label': {
          opacity: 0.2
        }

      }
    },
    iconButtonTranscoder: {

    },
    iconButtonNotifier: {


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
    buttonOfDataGrid: {

    },


  })
);

export default style;
