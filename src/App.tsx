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
import RoomFinder from './pages/RoomFinder/RoomFinder';
import MapView from './pages/MapView/MapView';
import Header from './components/Header/Header';
import theme from './interface/theme';
import Footer from './components/Footer/Footer';

const App: React.FC = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={MainView} />
          <Route exact path="/rooms" component={RoomFinder} />
          <Route exact path="/map" component={MapView} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
      <Footer />
    </MuiThemeProvider>
  </Router>
);

export default App;
