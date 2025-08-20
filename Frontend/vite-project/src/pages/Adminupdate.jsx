import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Adminupdate() {
  const { id } = useParams();

  const [userData, setUserData] = useState({
    firstName: "",
    email: "",
    isAdmin: false,
  });

  const { firstName, email, isAdmin } = userData;

  useEffect(() => {
    // fetch existing user details for edit
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:8000/api/v1/admin/users/${id}`);
      const data = await res.json();
      if (data.success) {
        setUserData({
          firstName: data.user.firstName,
          email: data.user.email,
          isAdmin: data.user.isAdmin,
        });
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/admin/users/update/${id}`,
        {
           method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("User updated successfully!");
      } else {
        alert(result.message || "Failed to update user");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">👨‍💼 Admin User Update</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            name="isAdmin"
            value={isAdmin ? "admin" : "user"}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                isAdmin: e.target.value === "admin",
              }))
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update User
        </button>
      </form>
    </div>
  );
}

export default Adminupdate;
