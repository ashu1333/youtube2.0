import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/HomeScreen/Homescreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import WatchScreen from "./screens/WatchScreen/WatchScreen";
import SearchScreen from "./screens/SearchScreen";
import ChannelScreen from "./screens/ChannelScreen/ChannelScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen/SubscriptionScreen";

import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  BrowserRouter as Router,
} from "react-router-dom";
import "./_app.scss";

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);
  const handleToggleSidebar = () => toggleSidebar((value) => !value);
  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />

      <div className="app__container">
        <SideBar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main ">
          {children}
        </Container>
      </div>
    </>
  );
};

const App = () => {
  const { loading, accessToken } = useSelector((state) => state.auth);

  const history = useHistory();
  useEffect(() => {
    if (!loading && !accessToken) {
      history.push("/auth");
    }
  }, [accessToken, loading, history]);

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Layout>
            <HomeScreen />
          </Layout>
        </Route>

        <Route path="/auth">
          <LoginScreen />
        </Route>

        <Route path="/search/:query">
          <Layout>
            <SearchScreen />
          </Layout>
        </Route>

        <Route path="/feed/subscriptions">
          <Layout>
            <SubscriptionScreen />
          </Layout>
        </Route>

        <Route path="/watch/:id">
          <Layout>
            <WatchScreen />
          </Layout>
        </Route>

        <Route path="/channel/:channelId">
          <Layout>
            <ChannelScreen />
          </Layout>
        </Route>

        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default App;
