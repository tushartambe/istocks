import React from 'react';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import withAuth from './components/withAuth';
import './index.css';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Investments from './pages/Investments';
import Login from './pages/Login';
import Register from './pages/Register';
import StockDetails from './pages/StockDetails';
import Transactions from './pages/Transactions';
import reportWebVitals from './reportWebVitals';

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeSwitcherProvider
      themeMap={themes}
      defaultTheme="dark"
      insertionPoint="styles-insertion-point"
    >
      <Router>
        <Switch>
          <Route exact path="/" component={withAuth(Home)} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/stocks/:symbol" component={withAuth(StockDetails)} />
          <Route path="/my-investments" component={withAuth(Investments)} />
          <Route path="/transactions" component={withAuth(Transactions)} />
          <Route exact path="/favorites" component={withAuth(Favorites)} />
        </Switch>
      </Router>
    </ThemeSwitcherProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
