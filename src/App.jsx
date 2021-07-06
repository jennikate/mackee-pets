import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import CharacterOverview from './pages/CharacterOverview';
import CharacterPets from './pages/CharacterPets';
import Home from './pages/Home';

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/characters">Characters</Link>
          </li>
          <li>
            <Link to="/pets">Pets</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/characters">
          <CharacterOverview />
        </Route>
        <Route path="/pets">
          <CharacterPets />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
