import Login from "./Auth/Login/Login";
import NavBar from "./Layout/NavBar/NavBar";
import SignUp from "./Auth/SignUp/SignUp";
import SignUpSeller from "./Auth/SignUp/SignUpSeller";
import AllProducts from "./Products/AllProducts/AllProducts";
import ProductDetails from "./Products/ProductDetails/ProductDetails";
import UserProfile from "./Auth/UserProfile/UserProfile";
import AuthService from "../Services/AuthServices/auth.service";

import { Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cart from "./Products/Cart/Cart";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  let authService = new AuthService();

  useEffect(() => {
    loadUser();
  }, []);

  let loadUser = () => {
    authService
      .isloggedin()
      .then((response) => {
        storeUser(response.data);
      })
      .catch((err) => storeUser(null));
  };

  let storeUser = (user) => {
    setLoggedUser({ loggedUser: user });
  };

  return (
    <>
      <main>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <NavBar storeUser={storeUser} loggedUser={loggedUser} />
              </div>
            )}
          />
          <Route
            path="/products"
            exact
            render={() => (
              <div>
                <NavBar storeUser={storeUser} loggedUser={loggedUser} />
                <AllProducts loggedUser={loggedUser} />
              </div>
            )}
          />
          <Route
            path="/products/cart"
            exact
            render={(props) => (
              <div>
                <NavBar storeUser={storeUser} loggedUser={loggedUser} />
                <Cart loggedUser={loggedUser} />
              </div>
            )}
          />
          <Route
            path="/products/:id"
            render={(props) => (
              <div>
                <NavBar storeUser={storeUser} loggedUser={loggedUser} />
                <ProductDetails {...props} loggedUser={loggedUser} />
              </div>
            )}
          />
          <Route path="/signUp" render={(props) => <SignUp {...props} storeUser={storeUser} />} />
          <Route
            path="/logOut"
            render={() => (
              <div>
                <NavBar storeUser={storeUser} loggedUser={loggedUser} />
              </div>
            )}
          />
          <Route path="/signUpSeller" render={() => <SignUpSeller storeUser={storeUser} />} />
          <Route path="/login" render={(props) => <Login {...props} storeUser={storeUser} />} />
        </Switch>
      </main>
    </>
  );
}

export default App;
