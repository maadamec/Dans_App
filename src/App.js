import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MainPage from "./pages/MainPage";
import NewOrderPage from "./pages/NewOrderPage";
import OrdersPage from "./pages/OrdersPage";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <div className="App" >
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
            <Route path="/products/list">
              <ProductsPage/>
            </Route>
            <Route path="/user/list">
             <UsersPage/>
            </Route>
            <Route path="/login">
              <LoginPage/>
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


