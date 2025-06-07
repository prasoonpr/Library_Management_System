// userTable.jsx
import React from "react";

const UserTable = ({ dummyUsers, onBlockToggle }) => (
  <table className="min-w-full bg-white shadow rounded">
    <thead>
      <tr className="bg-blue-100 text-left">
        <th className="py-3 pl-14">Name</th>
        <th className="py-3 pl-14">Email</th>
        <th className="py-3 pl-14">Status</th>
        <th className="py-3 pl-14">Actions</th>
      </tr>
    </thead>
    <tbody>
      {dummyUsers.map((user) => (
        <tr key={user._id} className="border-t">
          <td className=" py-2">{user.name}</td>
          <td className="">{user.email}</td>
          <td className="">{user.isBlocked ? "Blocked" : "Active"}</td>
          <td className="">
            <button
              onClick={() => onBlockToggle(user._id, user.isBlocked)}
              className={`px-3 py-1 rounded text-white ${
                user.isBlocked ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {user.isBlocked ? "Unblock" : "Block"}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;
