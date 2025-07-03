import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Blogs from './pages/Blogs'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Footer from './components/Footer'
import About from './pages/About'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Hero from './components/Hero'
const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Home /><Hero/></>
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
  },])
function App() {
  return (
   <>
     <RouterProvider router={router} />
   </>
  )
}

export default App