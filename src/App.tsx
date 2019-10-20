import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.scss';
import { MuiThemeProvider } from '@material-ui/core';
import MainView from './pages/MainView/MainView';
import Header from './components/Header/Header';
import theme from './interface/theme';


const App: React.FC = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <div id="App">
        <Header />
        <Switch>
          <Route exact path="/" component={MainView} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </MuiThemeProvider>
  </Router>
);

export default App;
