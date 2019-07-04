import React from 'react';

import {
  Router,
  Header,
  Socket,
} from "@/Commons/";

const App: React.FC = () => {
  return (
    <Socket.Provider value={{background: 'green', color: 'white'}}>
      <Header>
      </Header>
      <Router>
      </Router>
    </Socket.Provider>
  );
}

export default App;
