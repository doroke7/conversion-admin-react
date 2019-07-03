import React, { useState } from 'react';

interface IProps {
  history: any;
}

let Page = (PageComponent: any) => class extends React.Component<IProps> {
  public constructor(...oProps: any) {
    super(oProps);
    window.onstorage = (oEvent: any) => {

      // if (oEvent.newValue) {
      //   this.props.history.push("/chatroom");
      //   return;
      // }

      if (null === oEvent.key || '' === oEvent.newValue || null === oEvent.newValue) {
        this.props.history.push("/login");
        return;
      }
    };
  }

  public componentWillMount(){

  }

  public componentDidMount() {
    console.log('page componentDidMount...');
  }
  public render() {
    return <PageComponent history={this.props.history}/>;
  }
};

export default Page;