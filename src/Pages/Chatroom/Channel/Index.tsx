import React, { useState } from 'react';
import oIo from "socket.io-client";

import './Index.scss';

import ControlPannel from './ControlPannel/Index';
import Top from './Top/Index';
import Detail from './Detail/Index';

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Messages from './Messages/Index';
import { STORAGE, SOCKET, MOMENT } from "@/CONFIGS";



const Channel: React.FC = () => {
  let sChatroomUrl =
    SOCKET.HOST +
    (SOCKET.PORT && (80 !== SOCKET.PORT || "80" !== SOCKET.PORT)
      ? ":" + SOCKET.PORT
      : "") +
    "/chatroom";
  let sJwt = '';
  let oOption = {
  query: {
    jwt: sJwt
  }
  };
  let oChatroomSocket = oIo(sChatroomUrl, oOption);
  let $socket = oChatroomSocket;
  return (
    <div className="channel">
      <Top />
      <Row>
        <Col xs={24} sm={24} md={12} lg={16} xl={16} className="room-wrapper position-relative">
          <Messages />
          <ControlPannel className="position-absolute"/>
        </Col>
        <Col xs={0} sm={0} md={12} lg={8} xl={8} className="detail-wrapper position-relative">
          <Detail />
        </Col>
      </Row>
    </div>

  );
}

export default Channel;
