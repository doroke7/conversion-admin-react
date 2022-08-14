import * as React from 'react';

declare module '@mui/x-data-grid' {
  let mDefault: any;
  export class DataGrid extends React.Component<any, any> {}

  export interface GridColDef{}
  export interface GridValueGetterParams{}

  export default mDefault;
}