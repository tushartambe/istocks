import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import withAuth from './components/withAuth';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Investments from './pages/Investments';
import Login from './pages/Login';
import Register from './pages/Register';
import StockDetails from './pages/StockDetails';
import Transactions from './pages/Transactions';

const App = (props) => {
  return (
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
  );
}

export default App;
