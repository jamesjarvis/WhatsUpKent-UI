import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.scss';
import MainView from './pages/MainView/MainView';


const App: React.FC = () => (
  <Router>
    <div id="App">
      <Switch>
        <Route exact path="/" component={MainView} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
