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

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}

function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let oRouteMatch = useRouteMatch();
  let path = oRouteMatch.path;
  let url = oRouteMatch.url;

  return (
    <div>
      <h2>Topics</h2>
      <span>oRouteMatch={JSON.stringify(oRouteMatch)}</span>
      <ul>
        <li>
          <Link to={`${url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/test">Home</Link>
          </li>
          <li>
            <Link to="/test/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/test">
            <Home />
          </Route>
          <Route path="/test/topics">
            <Topics />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
