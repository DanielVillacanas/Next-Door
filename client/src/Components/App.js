import Login from "./Auth/Login/Login";
import NavBar from "./Layout/NavBar/NavBar";
import SignUp from "./Auth/SignUp/SignUp";
import SignUpSeller from "./Auth/SignUp/SignUpSeller";
import AllProducts from "./Products/AllProducts/AllProducts";
import ProductDetails from "./Products/ProductDetails/ProductDetails";
import SellerProfile from "./Auth/SellerProfile/SellerProfile";
import Cart from "./Products/Cart/Cart";
import CheckoutForm from "./Products/Payment/CheckoutForm";
import Footer from "./Layout/Footer/Footer";

import AuthService from "../Services/AuthServices/auth.service";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { SubtotalContext } from "../Context/SubtotalContext/SubtotalContext";
import { UserProvider } from "../Context/UserContext/UserContext";
import UserProfile from "./Auth/UserProfile/UserProfile";
import Home from "./Home/Home";

let authService = new AuthService();
const stripePromise = loadStripe(
  "pk_test_51K57lwFmKWmNynCn4tpPWoa3dTS3LrXIZ4Hh95ePl5rfKlUTrzoDgPd3mlNS3p3WIk7ncbrWdH6KbXK2yV1qbsn900T2PcOl2s"
);

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [type, setType] = useState("");
  let [subtotal, setSubtotal] = useState(0);
  const [refresh, setRefresh] = useState(false);

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
      <SubtotalContext.Provider value={{ subtotal, setSubtotal }}>
        <UserProvider value={{ loggedUser }}>
          <main>
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <div>
                    <NavBar
                      storeUser={storeUser}
                      loggedUser={loggedUser}
                      type={type}
                    />
                    <Home />
                    <Footer />
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
                    <AllProducts
                      refresh={refresh}
                      changeValueRefresh={changeValueRefresh}
                    />
                    <Footer />
                  </div>
                )}
              />

              <Route
                path="/payment"
                exact
                render={() => (
                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
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
                    <UserProfile
                      {...props}
                      loggedUser={loggedUser}
                      storeUser={storeUser}
                    />
                  </div>
                )}
              />
              <Route
                path="/products/:id"
                exact
                render={(props) => (
                  <div>
                    <NavBar
                      storeUser={storeUser}
                      loggedUser={loggedUser}
                      type={type}
                    />
                    <ProductDetails {...props} loadUser={loadUser} />
                  </div>
                )}
              />
              <Route
                path="/signUp"
                render={(props) => <SignUp {...props} storeUser={storeUser} />}
              />
              <Route
                path="/logOut"
                render={() => (
                  <div>
                    <NavBar
                      storeUser={storeUser}
                      loggedUser={loggedUser}
                      type={type}
                    />
                  </div>
                )}
              />
              <Route
                path="/signUpSeller"
                render={(props) => (
                  <SignUpSeller {...props} storeUser={storeUser} />
                )}
              />
              <Route
                path="/login"
                render={(props) => (
                  <Login
                    {...props}
                    storeUser={storeUser}
                    setTypeBussines={setTypeBussines}
                  />
                )}
              />
            </Switch>
          </main>
        </UserProvider>
      </SubtotalContext.Provider>
    </>
  );
}

export default App;
