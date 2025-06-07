import React from "react";
import UserTable from "../../components/adminComponents/userTable";
import AdminLayout from "../../components/adminComponents/AdminLayout";
import {
  useGetUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../../services/adminApi";

const ManageUsers = () => {
  const { data, isLoading, refetch } = useGetUsersQuery();
  console.log(data)
  const users = data?.users || [];

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      if (isBlocked) {
        await unblockUser(userId);
      } else {
        await blockUser(userId);
      }
      refetch();
    } catch (err) {
      console.error("Failed to update user status:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Manage Users</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <UserTable dummyUsers={users} onBlockToggle={handleBlockToggle} />
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
