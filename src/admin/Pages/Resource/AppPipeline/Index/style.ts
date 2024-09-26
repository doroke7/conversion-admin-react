import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, red, grey, teal, blue, indigo, lightBlue, common, yellow, green, purple, lightGreen, orange, deepOrange, amber, cyan } from '@material-ui/core/colors';

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
    stepButtonErrorIcon: {
      color: red[500],
      transform: 'scale(1.2)'
    },

    stepButtonDetailError: {
      color: red[500] + ' !important',
    },
    stepButtonDetailUnCompleted: {
      color: grey[500],
    },



    textField: {
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -5px) scale(0.65) !important'
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
        transform: 'translate(14px, 7px) scale(0.9)'
      },

      '& .MuiOutlinedInput-inputMarginDense': {
        paddingTop: oTheme.spacing(0.4375),
        paddingBottom: oTheme.spacing(0.4375),
      },
      '& .MuiOutlinedInput-root': {
        height: oTheme.spacing(3.25),
      },
      '& .MuiInputBase-input': {
        textAlign: 'left',
        fontSize: oTheme.spacing(1.75),
      },

    },
    fileName: {
      textDecoration: 'underline',
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

    },
    dataGrid: {
      minHeight: 'calc( 100vh - ' + oTheme.spacing(21) + 'px )',
      maxHeight: 'calc( 100vh - ' + oTheme.spacing(21) + 'px )',
      overflow: 'hidden',
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
    formControlState: {
      textAlign: 'left',
      width: oTheme.spacing(12),
      [oTheme.breakpoints.down('md')]: {
        width: oTheme.spacing(10),
      },
    },
    formControlServerUuid: {
      textAlign: 'left',
      width: oTheme.spacing(20),
      [oTheme.breakpoints.down('md')]: {
        width: oTheme.spacing(8),
      },
      '& .MuiInputLabel-outlined': {
        transform: 'translate(14px, 8px) scale(0.8)',
      }
    },
    serverUuid: {
      textAlign: 'left',
      display: 'inline-block',
      minWidth: oTheme.spacing(2),
    },
    percentage: {
      textAlign: 'right',
      display: 'inline-block',
      minWidth: oTheme.spacing(6),
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
      '&.MuiIconButton-root': {
        padding: oTheme.spacing(0.5)
      },
      '&.Mui-disabled': {
        color: 'rgb(0 0 0 / 7%)',



      },
    },
    iconButtonDetail: {
      color: lightBlue[700],
      '&:hover': {
        backgroundColor: lightBlue[700] + '44',
      }

    },
    iconButtonTranscoder: {
      color: orange[700],
      '&:hover': {
        backgroundColor: orange[700] + '44',

      }
    },
    iconButtonNotifier: {
      color: green[700],
      '&:hover': {
        backgroundColor: green[700] + '44',

      }
    },

    buttonTranscoderSubmit: {
      position: 'relative'
    },

    buttonTranscoderSubmitCircularProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate( -50%, -50%)'
    },
    dialogContent: {
      minHeight: oTheme.spacing(18.75),
      position: 'relative',
    },

    loadingIcon: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',

    },
    detail: {
      textAlign: 'center',
      color: grey[500]
    },
    detailStageNote: {
      marginBottom: oTheme.spacing(1)
    },
    detailAction: {
      fontSize: oTheme.spacing(1.8)
    },
    detailError: {
      color: red[500]
    },
    detailEditedTime: {
      fontSize: oTheme.spacing(1.6)
    },
    visibilityHidden: {
      visibility: 'hidden',
    },
    displayNone: {
      display: 'none'
    },
    stepConnector: {
      '&.MuiStepConnector-completed': {
        '& .MuiStepConnector-line': {
          borderColor: lightBlue[700],
          borderImage: 'linear-gradient(to right, ' + lightBlue[700] + ' 0%, ' + blue[700] + ' 100%)',
          borderImageSlice: 1,
        }
      },
      '&.MuiStepConnector-active': {
        '& .MuiStepConnector-line': {
        }
      },
      '&.Mui-disabled': {
        '& .MuiStepConnector-line': {
          borderTopStyle: 'dotted'
        },
        '& .MuiTypography-root': {
          color: 'rgba(0, 0, 0, 0.54)',
        }
      },

      '&.MuiStepConnector-alternativeLabel': {
        top: oTheme.spacing(1.25) + 'px',
      },
      '& .MuiStepConnector-lineHorizontal': {
        borderTopWidth: oTheme.spacing(0.375) + 'px',
      }
    },
    stepConnectorOngoing: {
      '&.MuiStepConnector-active': {
        '& .MuiStepConnector-line': {
          borderColor: lightBlue[500],
          borderImage: 'linear-gradient(to right, ' + blue[700] + ' 10%, ' + grey[100] + ' 60%)',
          borderImageSlice: 1,
        }
      },

    },
    stepConnectorFail: {
      '&.MuiStepConnector-active': {
        '& .MuiStepConnector-line': {
          borderColor: red[500],
          borderImage: 'linear-gradient(to right, ' + grey[50] + ' 10%, ' + red[600] + ' 90%)',
          borderImageSlice: 1,
        }
      },

    },

    iconButtonAnimation000: {
      animation: '$zoomIn 0.3s ease-in-out 0.00s 1 normal, $fadeIn 0.4s ease-in-out 0s 1 normal, $fade 0.00s ease-in-out 0s 1 normal',

    },
    iconButtonAnimation005: {
      animation: '$zoomIn 0.3s ease-in-out 0.05s 1 normal, $fadeIn 0.4s ease-in-out 0.05s 1 normal, $fade 0.05s ease-in-out 0s 1 normal',

    },
    iconButtonAnimation010: {
      animation: '$zoomIn 0.3s ease-in-out 0.10s 1 normal, $fadeIn 0.4s ease-in-out 0.10s 1 normal, $fade 0.10s ease-in-out 0s 1 normal',

    },
    iconButtonAnimation015: {
      animation: '$zoomIn 0.3s ease-in-out 0.15s 1 normal, $fadeIn 0.4s ease-in-out 0.15s 1 normal, $fade 0.15s ease-in-out 0s 1 normal',

    },
    iconButtonAnimation020: {
      animation: '$zoomIn 0.3s ease-in-out 0.20s 1 normal, $fadeIn 0.4s ease-in-out 0.20s 1 normal, $fade 0.20s ease-in-out 0s 1 normal',

    },
    iconButtonAnimation025: {
      animation: '$zoomIn 0.3s ease-in-out 0.25s 1 normal, $fadeIn 0.4s ease-in-out 0.25s 1 normal, $fade 0.25s ease-in-out 0s 1 normal',

    },
    iconButtonAnimation030: {
      animation: '$zoomIn 0.3s ease-in-out 0.30s 1 normal, $fadeIn 0.4s ease-in-out 0.30s 1 normal, $fade 0.30s ease-in-out 0s 1 normal',

    },
    iconButtonAnimation035: {
      animation: '$zoomIn 0.3s ease-in-out 0.35s 1 normal, $fadeIn 0.4s ease-in-out 0.35s 1 normal, $fade 0.35s ease-in-out 0s 1 normal',

    },
    iconButtonAnimation040: {
      animation: '$zoomIn 0.3s ease-in-out 0.40s 1 normal, $fadeIn 0.4s ease-in-out 0.40s 1 normal, $fade 0.40s ease-in-out 0s 1 normal',

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
    '@keyframes spin': {
      '0%': {
        transform: 'rotate(0deg) scale(0)'
      },
      '100%': {
        transform: 'rotate(360deg) scale(1)'
      }
    },
    '@keyframes zoomIn': {
      '0%': {
        transform: 'scale(0)'
      },
      '60%': {
        transform: 'scale(1.6)'
      },
      '100%': {
        transform: 'scale(1)'
      }
    },
    '@keyframes fade': {
      '0%': {
        opacity: '0'
      },
      '100%': {
        opacity: '0'
      }
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: '0'
      },
      '100%': {
        opacity: '1'
      }
    },

  })
);

export default style;
