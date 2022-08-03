import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';

function Home() {
  return <h2>Home</h2>;
}

function About() {
  let [oState, cSetState] = React.useState<any>({
    index: 0
  });

  let cHandleClick = (oEvent: React.MouseEvent) => {
    cSetState({ index: oState.index + 1 });
  };

  return (
    <div>
      <div onClick={cHandleClick}>
        <h5>ABOUT</h5>
      </div>
      <div>index: {oState.index}</div>
    </div>
  );
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId }: any = useParams();

  let [oState, cSetState] = React.useState<any>({
    index: 0
  });

  let cHandleClick = (oEvent: React.MouseEvent) => {
    cSetState({ index: oState.index + 1 });
  };

  return (
    <div>
      <div onClick={cHandleClick}>
        <h5>Requested topic ID: {topicId}</h5>
      </div>
      <div>index: {oState.index}</div>
    </div>
  );
}

function App() {
  let oHistory = useHistory();

  let [oState, cSetState] = React.useState<any>({
    number: 0
  });

  let cHandleClick = (oEvent: React.MouseEvent) => {
    cSetState({ number: oState.number + 1 });
  };

  let cHandleChangePage = (oEvent: React.MouseEvent) => {
    cSetState({ number: oState.number - 1 });

    oHistory.push('/test/jjj');
  };

  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/test">Home</Link>
          </li>
          <li>
            <Link to="/test/about">About</Link>
          </li>
          <li>
            <Link to="/test/topics">Topics</Link>
          </li>
        </ul>
        <div onClick={cHandleClick}>number:{oState.number}</div>
        <div onClick={cHandleChangePage}>CHANGE PAGE</div>
        <Switch>
          <Route path="/test/about">
            <About />
          </Route>
          <Route path="/test/topics">
            <Topics />
          </Route>
          <Route path="/test">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
