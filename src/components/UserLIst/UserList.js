import React from "react";
import UserListEl from "./UserListEl";

const UserList = ({ users }) => (
  <ul className="user-list">
    {users.map((user) => (
      <UserListEl key={user.id} user={user} />
    ))}
  </ul>
);

export default UserList;
