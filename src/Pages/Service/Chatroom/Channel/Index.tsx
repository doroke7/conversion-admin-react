import React, { useState } from 'react';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import store from '@/store';

import None from './None/Index';
import ControlPannel from './ControlPannel/Index';
import Top from './Top/Index';
import Detail from './Detail/Index';
import Messages from './Messages/Index';

import './Index.scss';

interface IProps {
  // className?: string | null;
  onLogout: any,
}

class Channel extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
    this.messagesRef = React.createRef();

    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    this.togglePlusPicker = this.togglePlusPicker.bind(this);

    store.subscribe(() => {
      let oState = store.getState();
      let sRoomId = oState.roomId;

      let _oState = {
        roomId: sRoomId ? sRoomId : ''
      };
      this.setState(_oState);
    });

  }

  public messagesRef: any

  public state: any = {
    roomId: '',
    pannelStatus: 'OFF',
  };

  public toggleEmojiPicker() {
    let sPannelStatus = 'OFF';
    if (this.state.pannelStatus == 'OFF' || this.state.pannelStatus == 'PLUS') {
      sPannelStatus = 'EMOJI';   
    } else if (this.state.pannelStatus == 'EMOJI') {
      // NOTHING
    }
    let oState = {
      pannelStatus: sPannelStatus
    };

    this.setState(oState);
    // this.messagesRef.current.scrollTop(322.3);
  }

  public togglePlusPicker() {
    let sPannelStatus = 'OFF';
    if (this.state.pannelStatus == 'OFF' || this.state.pannelStatus == 'EMOJI') {
      sPannelStatus = 'PLUS';   
    } else if (this.state.pannelStatus == 'PLUS') {
      // NOTHING
    }
    let oState = {
      pannelStatus: sPannelStatus
    };

    this.setState(oState);
    // this.messagesRef.current.scrollTop(322.3);
  }

  public render () {


    
    return (
      <div className="channel">
        <Top onLogout={this.props.onLogout}/>
        {this.state.roomId ?
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={16} className="room-wrapper position-relative">
              <Messages
                ref={this.messagesRef}
                isEmojiPickerShowed={this.state.isEmojiPickerShowed}
                pannelStatus={this.state.pannelStatus}
              />
              <ControlPannel
                isEmojiPickerShowed={this.state.isEmojiPickerShowed}
                toggleEmojiPicker={this.toggleEmojiPicker}
                togglePlusPicker={this.togglePlusPicker}
                pannelStatus={this.state.pannelStatus}
              >
              </ControlPannel>
            </Col>
            <Col xs={0} sm={0} md={0} lg={0} xl={8} className="detail-wrapper position-relative">
              <Detail />
            </Col>
          </Row> : 
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="position-relative">
              <None />
            </Col>
          </Row>}
      </div>
    );
  }
}

export default Channel;
