import React from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';
import Commons from '@/Commons';

import style from './style';

import actions from '@/actions/';

function Do(): any {
  const classes: any = style(void 0);
  let dispatch = useDispatch();

  let cShow = async () => {
    await dispatch(actions.admin.resource.domain.show());
  };

  cShow();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) => `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`
    }
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'ff', firstName: 'fffxccc', age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Rff', firstName: 'Harvey', age: 65 },
    { id: 11, lastName: 'RFFFie', firstName: 'Harvey', age: 65 },
    { id: 12, lastName: 'RTFe', firstName: 'Harvey', age: 65 },
    { id: 13, lastName: 'jkie', firstName: 'Harvey', age: 65 }
  ];

  let bLoading = false;

  return (
    <div className={classes.root}>
      <Commons.Admin.Menu>
        <Paper className={classes.paper}>
          <div className={classes.dataGridWrapper}>
            <DataGrid
              rows={rows}
              loading={bLoading}
              columns={columns}
              autoPageSize={true}
              pageSize={10}
              rowHeight={44}
              headerHeight={48}
            />
          </div>
        </Paper>
      </Commons.Admin.Menu>
    </div>
  );
}
export default Do;
