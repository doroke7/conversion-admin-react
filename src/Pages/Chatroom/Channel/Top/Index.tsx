import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faList, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Icon from '@material-ui/core/Icon';

import './Index.scss';

class Top extends React.Component {
  public constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
  }

  public componentDidUpdate() {
  }

  public render() {
    return (
      <div className="top text-center color-white position-relative">
        <span className="position-absolute left"><FontAwesomeIcon icon={faChevronLeft} /></span>
        <span>聊天室</span>
        <span className="position-absolute gear"><FontAwesomeIcon icon={faCog} /></span>
        <span className="position-absolute info"><FontAwesomeIcon icon={faList} /></span>
      </div>
    );
  }
}

export default Top;
