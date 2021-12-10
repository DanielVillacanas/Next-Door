import Login from "./Auth/Login/Login";
import NavBar from "./Layout/NavBar/NavBar";
import SignUp from "./Auth/SignUp/SignUp";
import SignUpSeller from "./Auth/SignUp/SignUpSeller";
import AllProducts from "./Products/AllProducts/AllProducts";
import ProductDetails from "./Products/ProductDetails/ProductDetails";
import SellerProfile from "./Auth/SellerProfile/SellerProfile";

import AuthService from "../Services/AuthServices/auth.service";

import { Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cart from "./Products/Cart/Cart";
import { UserProvider } from "../Context/UserContext/UserContext";
import UserProfile from "./Auth/UserProfile/UserProfile";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [type, setType] = useState("");
  const [refresh, setRefresh] = useState(false);

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

  const refreshProducts = () => {
    setRefresh(true);
  };
  const changeValueRefresh = () => {
    setRefresh(false);
  };

  let storeUser = (user) => {
    setLoggedUser({ loggedUser: user });
  };

  let setTypeBussines = (type) => {
    setType({ type: type });
  };

  return (
    <>
      <UserProvider value={{ loggedUser }}>
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
              render={(props) => (
                <div>
                  <NavBar
                    {...props}
                    storeUser={storeUser}
                    loggedUser={loggedUser}
                    type={type}
                    refreshProducts={() => refreshProducts()}
                  />
                  <AllProducts refresh={refresh} changeValueRefresh={changeValueRefresh} />
                </div>
              )}
            />
            <Route
              path="/products/cart"
              exact
              render={(props) => (
                <div>
                  <NavBar
                    {...props}
                    storeUser={storeUser}
                    loggedUser={loggedUser}
                    type={type}
                    refreshProducts={() => refreshProducts()}
                  />
                  <Cart loggedUser={loggedUser} />
                </div>
              )}
            />
            <Route
              path="/seller/:id"
              render={(props) => (
                <div>
                  <NavBar
                    refreshProducts={() => refreshProducts()}
                    storeUser={storeUser}
                    loggedUser={loggedUser}
                    type={type}
                    {...props}
                  />
                  <SellerProfile {...props} />
                </div>
              )}
            />
            <Route
              path="/user/:id"
              exact
              render={(props) => (
                <div>
                  <NavBar
                    refreshProducts={() => refreshProducts()}
                    storeUser={storeUser}
                    loggedUser={loggedUser}
                    type={type}
                    {...props}
                  />
                  <UserProfile {...props} loggedUser={loggedUser} storeUser={storeUser} />
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
      </UserProvider>
    </>
  );
}

export default App;
