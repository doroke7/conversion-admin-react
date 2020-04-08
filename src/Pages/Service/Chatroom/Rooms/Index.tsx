import React from 'react';
import { Service } from '@/Commons';
import store from '@/store';
import {
  roomIdAction
} from '@/actions';

import './Index.scss';
import Top from './Top/Index';
import Room from './Room/Index';

class Rooms extends React.Component<any> {
  public static contextType = Service.Tool;


  public constructor(...oProps: any) {
    super(oProps);

    this.onClick = this.onClick.bind(this);

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

  public onClick(sRoomId: string) {
  
    return () => {
      this.props.context.isScrolling = false;
      let oState = store.getState();
      let _sRoomId = oState.roomId;
      if (sRoomId !== _sRoomId) {
        store.dispatch(roomIdAction.edit(sRoomId));

      }
    };
  }

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
          {aRooms.map((oRoom : any, iIndex) => 
          <Room
            icon={oRoom.icon}
            name={oRoom.name}
            messages={oRoom.messages}
            count={oRoom.count}
            editedTime={oRoom.editedTime} 
            onClick={this.onClick(oRoom._id)}
          />)}
        </div>
      </div>
    );
  }
}

const Wrapper = (...oProps: any) => (
  <Service.Tool.Consumer>{oValue => <Rooms context={oValue}>{...oProps}</Rooms>}</Service.Tool.Consumer>
);
  // 使用 Wrapper  >> this.props.context
  // 使用 ..       >> this.context
export default Wrapper;