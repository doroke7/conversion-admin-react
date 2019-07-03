import React, { useState } from 'react';

let Page = (PageComponent: any) => class extends React.Component {

  public componentDidMount() {
    console.log('page componentDidMount...');
  }
  public render() {
    return <PageComponent/>;
  }
};

export default Page;