import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Blogs from './pages/Blogs'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Footer from './components/Footer'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Hero from './components/Hero'
import Profile from './pages/Profile'
import Comments from './pages/Comments'
import YourBlog from './pages/YourBlog'
import CreateBlogs from './pages/CreateBlogs'
const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Home/><Hero/></>
  },
  {
    path: "/blogs",
    element: <><Navbar/><Blogs /><Footer/></>
  },
  {
    path: "/about",
    element: <><Navbar/><About /><Footer/></>
  },
 {
    path: "/signup",
    element: <><Navbar/><Signup /></> 
  },
  {
    path: "/login",
    element: <><Navbar/><Login /></>
  },
  {
    
     path:"/dashboard",
    element: <><Navbar/><Dashboard/></>,
    children:[
    
    
      {
        path: "profile",
        element:<Profile/>
      },
           {
        path: "your-blog",
        element:<YourBlog/>
      },
      {
        path: "comments",
        element:<Comments/>
      },   {
        
      },
      
      
    ]
  }
])
function App() {
  return (
   <>
     <RouterProvider router={router} />
   </>
  )
}

export default App