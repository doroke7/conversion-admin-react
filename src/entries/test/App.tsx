import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';

// Since routes are regular React components, they
// may be rendered anywhere in the app, including in
// child elements.
//
// This helps when it's time to code-split your app
// into multiple bundles because code-splitting a
// React Router app is the same as code-splitting
// any other React app.\\

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function AA() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();
  let oRouteMatch = useRouteMatch();

  return (
    <div>
      <h3>{topicId}</h3>
      <span>oRouteMatch={JSON.stringify(oRouteMatch)}</span>
    </div>
  );
}

function AB() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();
  let oRouteMatch = useRouteMatch();

  return (
    <div>
      <h3>{topicId}</h3>
      <span>oRouteMatch={JSON.stringify(oRouteMatch)}</span>
    </div>
  );
}

function A() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let oRouteMatch = useRouteMatch();
  let path = oRouteMatch.path;
  let url = oRouteMatch.url;

  return (
    <div>
      <h2>A</h2>
      <span>oRouteMatch={JSON.stringify(oRouteMatch)}</span>
      <ul>
        <li>
          <Link to={`${url}/one`}>1</Link>
        </li>
        <li>
          <Link to={`${url}/two`}>2</Link>
        </li>
        <li>
          <Link to={`${url}/three`}>3</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.{path}</h3>
        </Route>
        <Route exact={false} path={`${path}/:topicId`}>
          <AA />
        </Route>
      </Switch>
    </div>
  );
}

function B() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let oRouteMatch = useRouteMatch();
  let path = oRouteMatch.path;
  let url = oRouteMatch.url;

  return (
    <div>
      <h2>B</h2>
      <span>oRouteMatch={JSON.stringify(oRouteMatch)}</span>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/test">Home</Link>
          </li>
          <li>
            <Link to="/test/a">A</Link>
          </li>
          <li>
            <Link to="/test/b">B</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/test">
            <Home />
          </Route>
          <Route exact={false} path="/test/a">
            <A />
          </Route>
          <Route exact={false} path="/test/b">
            <B />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
