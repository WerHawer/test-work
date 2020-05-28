import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { fetchUsers, fetchByUrl } from "../utils/api";
import { Pagination } from "@material-ui/lab";
import UserList from "../components/UserLIst/UserList";
import Loader from "../components/UI/Loader";

export default class UserListPage extends Component {
  state = {
    users: null,
    usersWithName: null,
    usersWillShow: null,
    usersPerPage: 5,
    page: 0,
    paginationPages: 6,
    isLoading: true,
  };

  async componentDidMount() {
    await this.getUsers();
    this.getMaxPaginationPage();
    this.getActualPageFromUrl();
    this.addPageToUrl();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.usersWillShow !== this.state.usersWillShow) {
      this.mapperGetUserNames();
    }
    if (prevState.page !== this.state.page) {
      this.getUsersWillShow();
      this.addPageToUrl();
    }
  }

  getActualPageFromUrl = () => {
    const page =
      Number(queryString.parse(this.props.location.search).page) || 1;
    this.setState({ page });
  };

  addPageToUrl = () => {
    const { page } = this.state;

    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `page=${page}`,
    });
  };

  getUsers = async () => {
    const { page, usersPerPage } = this.state;

    this.setState({ isLoading: true });

    const users = await fetchUsers(page, usersPerPage);

    this.setState({ users, isLoading: false });
  };

  getUsersWillShow = () => {
    const { users, page, usersPerPage } = this.state;

    const start = page * usersPerPage - usersPerPage;
    const end = page * usersPerPage;

    const usersWillShow = users.slice(start, end);

    this.setState({ usersWillShow });
  };

  mapperGetUserNames = async () => {
    const { usersWillShow } = this.state;

    const requestsArr = usersWillShow.map(({ url }) => fetchByUrl(url));
    const usersResponse = await axios.all(requestsArr);
    const mapUsersName = usersResponse.reduce((obj, { data }) => {
      obj[data.id] = data.name;
      return obj;
    }, {});
    const usersWithName = usersWillShow.map((user) => ({
      ...user,
      name: mapUsersName[user.id],
    }));

    this.setState({ usersWithName });
  };

  getMaxPaginationPage = () => {
    const { users, usersPerPage } = this.state;
    const paginationPages = users?.length / usersPerPage;

    this.setState({ paginationPages });
  };

  onClickPagination = (e, value) => {
    this.setState({ page: value });
  };

  render() {
    const { usersWithName, isLoading, paginationPages, page } = this.state;
    return (
      <main>
        {isLoading && <Loader />}
        {usersWithName && (
          <>
            <UserList users={usersWithName} />
            <Pagination
              page={page}
              count={paginationPages}
              size="large"
              hidePrevButton
              hideNextButton
              onChange={this.onClickPagination}
            />
          </>
        )}
      </main>
    );
  }
}
