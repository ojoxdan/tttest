import React, { useContext, useEffect } from "react";
import {
  Link,
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import AuthState from "../context/authContext/AuthState";
import { AuthContext } from "../context/authContext/AuthState";
import CheckOutState from "./single-pages/checkout/CheckOutState";
import BuyNowPurchases from "./buy-now-purchases/BuyNowPurchases";
import Favorites from "./favorites/Favorites";
import VoucherCredits from "./voucher-credits/VoucherCredits";
import Support from "./support/Support";
import Settings from "./settings/Settings";
import Profile from "./profile/Profile";
import Register from "../auth/Register";
import Login from "../auth/Login";
import ForgottenPassword from "../auth/ForgottenPassword";
import ChangePassword from "../auth/ChangePassword";
import Home from "./home/Home";
import Tmessenger from "./t-messenger/Tmessenger";
import SingleProduct from "./single-pages/SingleProduct";
import SinglePages from "./single-pages/SinglePages";
import Checkout from "./single-pages/checkout/Checkout";
import ShoppingCart from "./single-pages/checkout/ShoppingCart";
import BuyNowState from "./buy-now-purchases/BuyNowState";
import Orders from "./buy-now-purchases/Orders";
import Reviews from "./pending-reviews/Reviews";
import PostPage from "./single-pages/posts/PostPage";
import MessengerState from "./t-messenger/MessengerState";
import NotFound from "../common/NotFound"
import FavouriteState from "./favorites/FavouriteState";
import { CartState } from "../common/DropDownCart";
import PostState from "./single-pages/posts/PostState";
import CheckOutPage from "./single-pages/checkout/CheckOutPage";
import OrderDetails from "./buy-now-purchases/OrderDetails";
import CompleteOrder from "./single-pages/checkout/CompleteOrder";
import PrivateRoute from "../routing/PrivateRoute"
import Advertising from "./public-pages/Advertising";
import Buynow from "./public-pages/Buynow";
import Contact from "./public-pages/Contact";
import Faq from "./public-pages/Faq";
import HowToSell from "./public-pages/HowToSell";
import Membership from "./public-pages/Membership";
import Promotions from "./public-pages/Promotions";
import TinkokoLogistics from "./public-pages/TinkokoLogistics";
import StaySafe from "./public-pages/StaySafe";

const TinkokoBuyer = (props) => {

  return (
    <PostState>
      {/* <AuthState> */}
        {/* <FavouriteState> */}
        {/* <CartState>
          <CheckOutState>
            <BuyNowState> */}
              <MessengerState>
                <Router>
                  <Switch>
                  <Route path="/" exact component={Home} />
                  <Route
                path="/auth/forgotten-password"
                exact
                component={ForgottenPassword}
              />
              <Route
                path="/auth/change-password/:token"
                exact
                component={ChangePassword}
              />
              <Route path="/login" exact component={Login} />
              <Route path="/post/*" exact component={SinglePages} />
              <Route path="/posts/*" exact component={PostPage} />
              <Route path="/register" exact component={Register} />
              <Route path="/buyer/" exact component={Home} />
              <Route path="/checkout" exact component={ShoppingCart} />
              <PrivateRoute
                path="/checkout/:cart"
                exact
                {...props}
                component={CheckOutPage}
              />
              <Route
                path="/checkout/:cart/:msg"
                exact
                {...props}
                component={CompleteOrder}
              />
              <Route path="/shopping-cart/" exact component={ShoppingCart} />


                    <PrivateRoute
                      path="/buyer/buy-now-purchases"
                      exact
                      component={() => (
                        <Redirect to="/buyer/buy-now-purchases/orders" />
                      )}
                    />
                    <PrivateRoute
                      path="/buyer/buy-now-purchases/*"
                      exact
                      component={BuyNowPurchases}
                    />
                    <PrivateRoute
                      path="/buyer/pending-reviews"
                      exact
                      component={Reviews}
                    />
                    <PrivateRoute
                      path="/buyer/pending-reviews/*"
                      exact
                      component={Reviews}
                    />
                    <PrivateRoute
                      path="/buyer/favorites"
                      exact
                      component={Favorites}
                    />
                    <PrivateRoute
                      path="/buyer/voucher-credits"
                      exact
                      component={VoucherCredits}
                    />
                    <PrivateRoute path="/buyer/support" exact component={Support} />
                    <PrivateRoute path="/buyer/settings" exact component={Settings} />
                    <PrivateRoute path="/buyer/profile" exact component={Profile} />
                    <PrivateRoute
                      path="/buyer/t-messenger"
                      exact
                      component={Tmessenger}
                    />
                    {/* Public pages  */}
                    <Route path="/resource/advertising"  component={Advertising}/>
                    <Route path="/resource/buynow"  component={Buynow}/>
                    <Route path="/resource/contact"  component={Contact}/>
                    <Route path="/resource/faq"  component={Faq}/>
                    <Route path="/resource/how-to-sell"  component={HowToSell}/>
                    <Route path="/resource/membership"  component={Membership}/>
                    <Route path="/resource/promotions"  component={Promotions}/>
                    <Route path="/resource/stay-safe"  component={StaySafe}/>
                    <Route path="/resource/tinkoko-logistics"  component={TinkokoLogistics}/>
                    <Route exact path="*" component={NotFound} />
                  </Switch>
                </Router>
              </MessengerState>
            {/* </BuyNowState>
          </CheckOutState>
        </CartState> */}
        {/* </FavouriteState> */}
      {/* </AuthState> */}
    </PostState>
  );
};

export default TinkokoBuyer;
