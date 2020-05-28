import React, { Component } from "react";
import { fetchUserByLogin } from "../utils/api";
import Loader from "../components/UI/Loader";
import OneUser from "../components/OneUser/OneUser";

export default class OneUserPage extends Component {
  state = { user: null };

  async componentDidMount() {
    const { match } = this.props;
    const login = match?.params?.login;
    const user = await fetchUserByLogin(login);
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        {!user && <Loader />}
        {user && <OneUser user={user} />}
      </>
    );
  }
}
