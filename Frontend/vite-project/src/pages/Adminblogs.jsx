import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setBlog } from '@/redux/blogSlice';
import { toast } from 'sonner';

function Adminblogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // fetch all blogs
  const getAllBlogsData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/admin/blogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
        dispatch(setBlog(data.blogs)); // Sync with Redux store
      } else {
        console.log("Fetch error:", data.message);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/v1/admin/blogs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();
      if (result.success) {
        alert("Blog deleted successfully!");
        setBlogs(blogs.filter((blogItem) => blogItem._id !== id));
      } else {
        alert(result.message || "Failed to delete blog");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllBlogsData();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">📝 Admin Blogs Data</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr
                key={blog._id}
                className="border-b transition hover:bg-gray-100"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <NavLink
                    to={`/blogs/${blog._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {blog.title}
                  </NavLink>
                </td>
                <td className="px-4 py-2">{blog.category}</td>
                <td className="px-4 py-2">
                  {blog.author?.firstName || "Unknown"}
                </td>
                <td className="px-4 py-2">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View
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

export default Adminblogs;