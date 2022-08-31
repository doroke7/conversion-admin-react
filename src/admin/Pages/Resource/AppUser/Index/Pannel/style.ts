import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { pink, grey, lightBlue, cyan, indigo, blue } from '@material-ui/core/colors';

let oStyle = makeStyles((oTheme: Theme) =>
  createStyles({
    root: {
      marginTop: oTheme.spacing(1),
      marginBottom: oTheme.spacing(3)
    },
    id: {
      width: 'calc( 10% ' + '- ' + oTheme.spacing(2) + 'px )',
      marginRight: oTheme.spacing(2)
    },
    username: {
      width: 'calc( 10% ' + '- ' + oTheme.spacing(2) + 'px )',
      marginRight: oTheme.spacing(2)
    },
    formControl: {
      '& fieldset': {
        '& > legend': {
          maxWidth: oTheme.spacing(250)
        }
      },
      width: 'calc( 10% ' + '- ' + oTheme.spacing(2) + 'px )',
      marginRight: oTheme.spacing(2)
    },
    formControlCode: {
      '& fieldset': {
        '& > legend': {
          maxWidth: oTheme.spacing(250)
        }
      }
    },
    formControlPhoneType: {
      '& fieldset': {
        '& > legend': {
          width: oTheme.spacing(4)
        }
      }
    },
    formControlVip: {
      '& fieldset': {
        '& > legend': {
          width: oTheme.spacing(8)
        }
      }
    },
    selectCode: {},
    selectEmpty: {
      color: grey[400]
    },
    number: {
      width: 'calc( 10% ' + '- ' + oTheme.spacing(2) + 'px )',
      marginRight: oTheme.spacing(2)
    },
    startDate: {
      width: 'calc( 10% ' + '- ' + oTheme.spacing(2) + 'px )',
      marginRight: oTheme.spacing(2),
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
      width: 'calc( 10% ' + '- ' + oTheme.spacing(2) + 'px )',
      marginRight: oTheme.spacing(2),

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
