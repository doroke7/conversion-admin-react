import React from 'react';
import store from '@/store';

import './Index.scss';
import Top from './Top/Index';
import Room from './Room/Index';

class Rooms extends React.Component {
  public constructor(props: any) {
    super(props);

    store.subscribe(() => {
      let oState = store.getState();
      let aRooms = oState.rooms;

      let _oState = {
        rooms: aRooms,
      };
      this.setState(_oState);
    });
  }


  public componentDidMount() {
  }

  public componentDidUpdate() {
  }

  public render() {
    return (
      <div className="rooms">
        <Top />
        <div className="pseudo-rooms overflow-auto">
          {[1,1,1].map((iNumber, iIndex) => <Room/>)}
        </div>
      </div>
    );
  }
}

export default Rooms;