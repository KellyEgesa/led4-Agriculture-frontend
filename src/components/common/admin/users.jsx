import React, { Component } from "react";
import Pagination from "../pagination";
import { paginate } from "../paginate";
import { toast } from "react-toastify";

import _ from "lodash";
import {
  getUsers,
  deleteUser,
  makeEditor,
  removeEditor,
  makeAdmin,
  removeAdmin,
} from "../../service/admin";
import UserTable from "../usersTable";
import SearchBox from "../searchBox";
import ReactLoad from "../../reactload";

class Users extends Component {
  state = {
    loaded: false,
    users: [],
    Userclass: ["Normal", "Admin", "Editor"],
    currentPage: 1,
    pageSize: 15,
    searchQuery: "",
    sortColumn: { path: "firstname", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getUsers();
    const users = [...data];
    this.setState({ users, loaded: true });
  }
  handleDelete = async (user) => {
    const originalUsers = this.state.users;
    const user1 = originalUsers.filter((s) => s._id !== user._id);
    this.setState({ user1 });
    try {
      await deleteUser(user._id);
      toast.success("The User has been deleted");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This User has been already deleted");
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
      this.setState({ users: originalUsers });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleUserClassSelect = (item) => {
    this.setState({ selectedUserClass: item, currentPage: 1 });
  };
  handleEditor = async (user) => {
    const originalUsers = [...this.state.users];
    const users = [...this.state.users];
    const index = users.indexOf(user);
    users[index] = { ...users[index] };
    users[index].editor = !users[index].editor;
    this.setState({ users });
    try {
      if (!user.editor) {
        await makeEditor(user._id);
      } else {
        await removeEditor(user._id);
      }
      toast.success("User has been changed");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Something went wrong");
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
      this.setState({ users: originalUsers });
    }
  };
  handleAdmin = async (user) => {
    const originalUsers = [...this.state.users];
    const users = [...this.state.users];
    const index = users.indexOf(user);
    users[index] = { ...users[index] };
    users[index].isAdmin = !users[index].isAdmin;
    this.setState({ users });
    try {
      if (!user.isAdmin) {
        await makeAdmin(user._id);
      } else {
        await removeAdmin(user._id);
      }
      toast.success("The User has been changed");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Something went wrong");
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
      this.setState({ users: originalUsers });
    }
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedUserClass: null,
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedUserClass,
      users: allUsers,
      searchQuery,
    } = this.state;

    let filtered = allUsers;

    filtered = searchQuery
      ? (filtered = allUsers.filter((m) =>
          m.firstname.toLowerCase().startsWith(searchQuery.toLowerCase())
        ))
      : selectedUserClass === "Normal"
      ? allUsers.filter((m) => m.editor === false)
      : selectedUserClass === "Editor"
      ? allUsers.filter((m) => m.editor === true)
      : selectedUserClass === "Admin"
      ? allUsers.filter((m) => m.isAdmin === true)
      : allUsers;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const users = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: users };
  };

  render() {
    const { length: count } = this.state.users;
    const {
      loaded,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      Userclass,
      selectedUserClass,
    } = this.state;

    if (count === 0 && loaded) return <p>There is no one in the database.</p>;

    const { totalCount, data: users } = this.getPagedData();

    return (
      <div className="card rounded-lg p-3 m-2">
        <h1 className="text-center p-2">USERS PAGE</h1>
        {!loaded ? (
          <div className="d-flex justify-content-center">
            <ReactLoad type={"bars"} color={"black"} />
          </div>
        ) : (
          <div className="row">
            <div className="col-3">
              <ul className="list-group">
                {Userclass.map((item) => (
                  <li
                    onClick={() => this.handleUserClassSelect(item)}
                    key={item}
                    className={
                      item === selectedUserClass
                        ? "list-group-item active"
                        : "list-group-item"
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col">
              <p>Showing {totalCount} users in the database.</p>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <UserTable
                users={users}
                sortColumn={sortColumn}
                onEditor={this.handleEditor}
                onAdmin={this.handleAdmin}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Users;
