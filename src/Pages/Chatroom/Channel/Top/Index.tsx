import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faList, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Icon from '@material-ui/core/Icon';


import './Index.scss';


const Top: React.FC = () => {
  return (
    <div className="top text-center color-white position-relative">
      <FontAwesomeIcon className="align-middle position-absolute left" icon={faChevronLeft} />
      <span>聊天室</span>
      <FontAwesomeIcon className="align-middle position-absolute gear" icon={faCog} />
      <FontAwesomeIcon className="align-middle position-absolute info" icon={faList} />
    </div>
  );
}

export default Top;
