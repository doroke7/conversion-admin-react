import React from 'react';
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@material-ui/lab/Pagination';

import wrappers from '@/wrappers/index';
import utilities from '@/utilities/index';

import style from './style';

function Index(oProps: any): any {
  let oClasses: any = style(void 0);
  let oHistory = useHistory();

  let oParams: any = useParams();
  let oRouteMatch = useRouteMatch();

  // let [oState, cSetState] = React.useState<any>({
  //   page: oParams.page ?? 1
  // });

  let aRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
  ];

  let aColumns: any[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: '姓',
      width: 150,
      editable: false
    },
    {
      field: 'lastName',
      headerName: '名',
      width: 150,
      editable: false
    },
    {
      field: 'age',
      headerName: '年龄',
      type: 'number',
      width: 110,
      editable: false
    },
    {
      field: 'fullName',
      headerName: '名称',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: any) =>
        `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''}`
    }
  ];

  let cHandleChange = (oEvent: React.ChangeEvent<unknown>, iPage: number) => {
    let oNextPageParams = {
      ...oParams,
      page: iPage
    };
    let sUrl = utilities.url(oRouteMatch.path, oNextPageParams);
    oHistory.push(sUrl);
  };

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={aRows}
        columns={aColumns}
        rowCount={999}
        page={0}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        loading={true}
      />
      <div>
        {oParams.page}
        <Pagination
          count={48}
          variant="outlined"
          shape="rounded"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
          showFirstButton
          showLastButton
          page={Number(oParams.page) ?? 1}
          onChange={cHandleChange}
        />
      </div>
    </div>
  );
}
export default wrappers.admin.tab(wrappers.admin.title(Index));
