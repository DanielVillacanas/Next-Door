import Login from "./Auth/Login/Login";
import NavBar from "./Layout/NavBar/NavBar";
import SignUp from "./Auth/SignUp/SignUp";
import SignUpSeller from "./Auth/SignUp/SignUpSeller";
import Home from "./Home/Home";
import AllProducts from "./Products/AllProducts/AllProducts";
import ProductDetails from "./Products/ProductDetails/ProductDetails";

import AuthService from "../Services/AuthServices/auth.service";

import { Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [type, setType] = useState("");

  let authService = new AuthService();

  useEffect(() => {
    loadUser();
  }, []);

  let loadUser = () => {
    authService
      .isloggedin()
      .then((response) => {
        storeUser(response.data.user);
      })
      .catch((err) => storeUser(null));
  };

  let storeUser = (user) => {
    setLoggedUser({ loggedUser: user });
  };
  let setTypeBussines = (type) => {
    setType({ type: type });
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
                <NavBar storeUser={storeUser} loggedUser={loggedUser} type={type} />
              </div>
            )}
          />
          <Route
            path="/products"
            exact
            render={() => (
              <div>
                <NavBar storeUser={storeUser} loggedUser={loggedUser} type={type} />
                <AllProducts />
              </div>
            )}
          />
          <Route
            path="/products/:id"
            render={(props) => (
              <div>
                <NavBar storeUser={storeUser} loggedUser={loggedUser} type={type} />
                <ProductDetails {...props} />
              </div>
            )}
          />
          <Route path="/signUp" render={(props) => <SignUp {...props} storeUser={storeUser} />} />
          <Route
            path="/logOut"
            render={() => (
              <div>
                <NavBar storeUser={storeUser} loggedUser={loggedUser} type={type} />
              </div>
            )}
          />
          <Route path="/signUpSeller" render={() => <SignUpSeller storeUser={storeUser} />} />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} storeUser={storeUser} setTypeBussines={setTypeBussines} />
            )}
          />
        </Switch>
      </main>
    </>
  );
}

export default App;
