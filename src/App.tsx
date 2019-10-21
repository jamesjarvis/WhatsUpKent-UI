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
import Footer from './components/Footer/Footer';


const App: React.FC = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={MainView} />
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
