import Login from "./Auth/Login/Login";
import NavBar from "./Layout/NavBar/NavBar";
import SignUp from "./Auth/SignUp/SignUp";
import SignUpSeller from "./Auth/SignUp/SignUpSeller";
import Home from "./Home/Home";
import AllProducts from "./Products/AllProducts/AllProducts";
import ProductDetails from "./Products/ProductDetails/ProductDetails";
import SellerProfile from "./Auth/SellerProfile/SellerProfile";
import NewProduct from "./Products/NewProduct/NewProduct";

import AuthService from "../Services/AuthServices/auth.service";

import { Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

function App() {
  const [loggedUser, setLoggedUser] = useState(undefined);

  let authService = new AuthService();

  useEffect(() => {
    loadUser();
  }, []);

  let loadUser = () => {
    authService
      .isloggedin()
      .then((response) => {
        console.log(response);
        storeUser(response.data);
      })
      .catch((err) => storeUser(null));
  };

  let storeUser = (user) => {
    setLoggedUser({ loggedUser: user });
    // localStorage.setItem("user", user);
    // console.log({ localdata: localStorage.getItem("user") });
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
                <Home />
              </div>
            )}
          />
          <Route
            path="/new-product"
            exact
            render={(props) => (
              <div>
                <NavBar storeUser={storeUser} loggedUser={loggedUser} />
                <NewProduct {...props} />
              </div>
            )}
          />
          <Route
            path="/seller/:id"
            exact
            render={(props) => (
              <div>
                <NavBar storeUser={storeUser} loggedUser={loggedUser} />
                <SellerProfile {...props} />
              </div>
            )}
          />
          <Route
            path="/products"
            exact
            render={() => (
              <div>
                <NavBar storeUser={storeUser} loggedUser={loggedUser} />
                <AllProducts />
              </div>
            )}
          />
          <Route
            path="/products/:id"
            render={(props) => (
              <div>
                <NavBar storeUser={storeUser} loggedUser={loggedUser} />
                <ProductDetails {...props} />
              </div>
            )}
          />
          <Route
            path="/signUp"
            render={(props) => <SignUp {...props} storeUser={storeUser} />}
          />
          <Route
            path="/signUpSeller"
            render={() => <SignUpSeller storeUser={storeUser} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} storeUser={storeUser} />}
          />
        </Switch>
      </main>
    </>
  );
}

export default App;
