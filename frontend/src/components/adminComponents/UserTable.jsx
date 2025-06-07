import React from "react";

const dummyUsers = [
  { id: 1, name: "Prasoon", email: "prasoon@gmail.com", role: "student" },
  { id: 2, name: "Rahul", email: "rahul@school.com", role: "teacher" },
];

const UserTable = () => (
  <table className="min-w-full bg-white shadow rounded">
    <thead>
      <tr className="bg-blue-100 text-left">
        <th className="py-3 pl-10">Name</th>
        <th className="py-3 pl-10">Email</th>
        <th className="py-3 pl-10">Role</th>
        <th className="py-3 pl-10">Actions</th>
      </tr>
    </thead>
    <tbody>
      {dummyUsers.map((user) => (
        <tr key={user.id} className="border-t">
          <td className="p-3">{user.name}</td>
          <td className="p-3">{user.email}</td>
          <td className="p-3 capitalize">{user.role}</td>
          <td className="p-3 space-x-2">
            <button className="px-3 py-1 bg-yellow-500 text-white rounded">Block</button>
            <button className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;
