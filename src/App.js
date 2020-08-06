import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import makeStyles from "@material-ui/core/styles/makeStyles";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import MainPage from "./pages/MainPage";
import NewOrderPage from "./pages/NewOrderPage";
import OrdersPage from "./pages/OrdersPage";
import SwipeableMenu from "./components/SwipableManu";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">

      <Grid container alignItems={'flex-start'} spacing={3}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={1} justify={"flex-end"} >
          <SwipeableMenu/>
        </Grid>
      </Grid>
      <Router>
        <div>
          <Switch>
            <Route path="/profile">
              <ProfilePage/>
            </Route>
            <Route path="/order/list">
              <OrdersPage/>
            </Route>
            <Route path="/order/new">
              <NewOrderPage/>
            </Route>
            <Route path="/login">
              <LoginPage/>
            </Route>
            <Route path="/register">
              <RegisterPage/>
            </Route>
            <Route path="/">
              <MainPage/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;


