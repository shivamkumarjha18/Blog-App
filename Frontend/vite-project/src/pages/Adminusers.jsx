import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
function Adminusers() {
  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 👈 Cookie bhejega
      });

      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/v1/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();
      if (result.success) {
        alert("User deleted successfully!");
        setUsers(users.filter((user) => user._id !== id));
      } else {
        alert(result.message || "Failed to delete user");
      }
    } catch (err) {
      console.log(err);
    }
  };
      
 

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">👨‍💼 Admin Users Data </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">First Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b transition hover:bg-gray-100"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.firstName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  {user.isAdmin ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <span className="text-gray-600">User</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 space-x-2">

                  <NavLink to={`/admin/users/${user._id}/edit`}>
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </NavLink>
                  
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Adminusers;
