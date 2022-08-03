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
  let oMatch = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      <h3>oMatch = {JSON.stringify(oMatch)}</h3>
      <h3>oMatch.path 为 当下组件外层 Route 所匹配的 虚拟路由</h3>
      <h3>oMatch.url 为 当下组件外层 Route 所匹配的 真实地址</h3>

      <ul>
        <li>
          {/** oMatch 为 Topics 当下所在 路由， 为 oMatch.path="/test/topics" */}
          <Link to={`${oMatch.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${oMatch.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${oMatch.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={oMatch.path}>
          <h4>Please select a topic.</h4>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId }: any = useParams();
  let oMatch = useRouteMatch();

  let [oState, cSetState] = React.useState<any>({
    index: 0
  });

  let cHandleClick = (oEvent: React.MouseEvent) => {
    cSetState({ index: oState.index + 1 });
  };

  return (
    <div>
      <h4>Topic</h4>
      <h4>oMatch = {JSON.stringify(oMatch)}</h4>
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
