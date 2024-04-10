import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {},
    id: {
      width: 'calc( 10% ' + '- ' + oTheme.spacing(2) + 'px )',
      marginRight: oTheme.spacing(2),
      [oTheme.breakpoints.down('lg')]: {
        width: 'calc( 10% ' + '- ' + oTheme.spacing(1) + 'px )',
        marginRight: oTheme.spacing(1)
      },
      [oTheme.breakpoints.down('sm')]: {
        width: 'calc( 100% ' + '- ' + oTheme.spacing(0) + 'px )',
        marginTop: oTheme.spacing(2),
        marginRight: oTheme.spacing(0)
      }
    },
    username: {
      width: 'calc( 10% ' + '- ' + oTheme.spacing(2) + 'px )',
      marginRight: oTheme.spacing(2),
      [oTheme.breakpoints.down('lg')]: {
        width: 'calc( 10% ' + '- ' + oTheme.spacing(1) + 'px )',
        marginRight: oTheme.spacing(1)
      },
      [oTheme.breakpoints.down('sm')]: {
        width: 'calc( 100% ' + '- ' + oTheme.spacing(0) + 'px )',
        marginTop: oTheme.spacing(2),
        marginRight: oTheme.spacing(0)
      }
    },
    formControl: {
      width: 'calc( 10% ' + '- ' + oTheme.spacing(2) + 'px )',
      marginRight: oTheme.spacing(2),
      [oTheme.breakpoints.down('lg')]: {
        width: 'calc( 10% ' + '- ' + oTheme.spacing(1) + 'px )',
        marginRight: oTheme.spacing(1)
      },
      [oTheme.breakpoints.down('sm')]: {
        width: 'calc( 100% ' + '- ' + oTheme.spacing(0) + 'px )',
        marginTop: oTheme.spacing(2),
        marginRight: oTheme.spacing(0)
      }
    },
    formControlCode: {
      '& fieldset': {
        '& > legend': {
          minWidth: oTheme.spacing(4)
        }
      }
    },
    formControlPhoneType: {
      '& fieldset': {
        '& > legend': {
          minWidth: oTheme.spacing(4)
        }
      }
    },
    formControlVip: {
      '& fieldset': {
        '& > legend': {
          minWidth: oTheme.spacing(7)
        }
      }
    },
    selectCode: {},
    selectEmpty: {
      color: grey[400]
    },
    number: {
      width: 'calc( 10% ' + '- ' + oTheme.spacing(2) + 'px )',
      marginRight: oTheme.spacing(2),
      [oTheme.breakpoints.down('lg')]: {
        width: 'calc( 10% ' + '- ' + oTheme.spacing(1) + 'px )',
        marginRight: oTheme.spacing(1)
      },
      [oTheme.breakpoints.down('sm')]: {
        width: 'calc( 100% ' + '- ' + oTheme.spacing(0) + 'px )',
        marginTop: oTheme.spacing(2),
        marginRight: oTheme.spacing(0)
      }
    },
    startDate: {
      width: 'calc( 13% ' + '- ' + oTheme.spacing(2) + 'px )',
      marginRight: oTheme.spacing(2),
      [oTheme.breakpoints.down('lg')]: {
        width: 'calc( 13% ' + '- ' + oTheme.spacing(1) + 'px )',
        marginRight: oTheme.spacing(1)
      },
      [oTheme.breakpoints.down('sm')]: {
        width: 'calc( 100% ' + '- ' + oTheme.spacing(0) + 'px )',
        marginTop: oTheme.spacing(2),
        marginRight: oTheme.spacing(0)
      },
      '& .MuiFormLabel-filled': {
        '& + .MuiInputBase-root': {
          color: 'rgba(0, 0, 0, 0.87)'
        }
      },
      '& .MuiInputBase-root': {
        color: grey[400]
      }
    },
    endDate: {
      width: 'calc( 14% ' + '- ' + oTheme.spacing(2) + 'px )',
      marginRight: oTheme.spacing(2),
      [oTheme.breakpoints.down('lg')]: {
        width: 'calc( 14% ' + '- ' + oTheme.spacing(1) + 'px )',
        marginRight: oTheme.spacing(1)
      },
      [oTheme.breakpoints.down('sm')]: {
        width: 'calc( 100% ' + '- ' + oTheme.spacing(0) + 'px )',
        marginTop: oTheme.spacing(2),
        marginRight: oTheme.spacing(0)
      },
      '& .MuiFormLabel-filled': {
        '& + .MuiInputBase-root': {
          color: 'rgba(0, 0, 0, 0.87)'
        }
      },
      '& .MuiInputBase-root': {
        color: grey[400] // 时间选择器：未选择时候是暗灰色
      }
    },
    selectPhoneType: {},
    selectVip: {},
    icon: {
      maxWidth: oTheme.spacing(2),
      maxHeight: oTheme.spacing(2)
    }
  })
);

export default oStyle;
