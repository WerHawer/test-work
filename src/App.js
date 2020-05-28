import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import { Route, Switch, Redirect } from "react-router-dom";
import UserListPage from "./pages/UserListPage";
import OneUserPage from "./pages/OneUserPage";

export default class App extends Component {
  render() {
    return (
      <Container maxWidth="md">
        <Switch>
          <Route path="/userlist" component={UserListPage} />
          <Route path="/user/:login" component={OneUserPage} />

          <Redirect to="/userlist" />
        </Switch>
      </Container>
    );
  }
}
