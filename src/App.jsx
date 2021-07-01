import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Ceralie from './pages/ceralie';
import Home from './pages/home';

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ceralie">Ceralie</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/ceralie">
          <Ceralie />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
