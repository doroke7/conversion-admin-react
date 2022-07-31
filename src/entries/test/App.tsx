import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
// About Page
const About = () => {
  const hist = useHistory();
  return (
    <div>
      <h1>About</h1>
      <button onClick={() => hist.goBack()}>Go Back</button>
      <LoremText />
    </div>
  );
};
const Shop = () => {
  const params: any = useParams();
  const current = params.id;
  const next = Number(current) + 1;
  const hist = useHistory();
  return (
    <div>
      <h1>Shop</h1>
      <p>You requested item with ID: {current}</p>
      <button onClick={() => hist.goBack()}>Go Back</button>
      <button onClick={() => hist.push(`/shop/${next}`)}>Next product</button>
    </div>
  );
};
function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/shop/1">Shop</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/shop/:id">
            <Shop />
          </Route>
        </Switch>
        {/* 使用 Link, Switch, Route 做前端路由 */}
      </main>
    </Router>
  );
}
// Home Page
const Home = () => (
  <Fragment>
    <h1>Home</h1>
    <LoremText />
  </Fragment>
);
const LoremText = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
);

export default App;
