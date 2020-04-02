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
      let oRooms = oState.rooms;

      let _oState = {
        rooms: oRooms,
      };
      this.setState(_oState);
    });
  }

  public state: any = {
    rooms: [],
  };

  public componentDidMount() {
  }

  public componentDidUpdate() {
  }

  public render() {
    let aRooms = Object.values(this.state.rooms);
    return (
      <div className="rooms">
        <Top />
        <div className="pseudo-rooms overflow-auto">
          {aRooms.map((oRoom : any, iIndex) => <Room icon={oRoom.icon} name={oRoom.name} editedTime={oRoom.editedTime}/>)}
        </div>
      </div>
    );
  }
}

export default Rooms;