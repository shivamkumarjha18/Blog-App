import React from 'react'
import { Navigate, NavLink ,Outlet} from 'react-router-dom'
import { CiUser } from "react-icons/ci";
import { FaCloud } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
function Adminlayout() {

      const { user } = useSelector(store => store.auth)
      console.log(user)
      if(!user.isAdmin){
return <Navigate to="/" />
      }
      
  return (<>
   
        <div className="pt-15">
            <nav>
                <ul>
                    <li ><NavLink to="/admin/users"> <CiUser /> Users</NavLink></li>
                    <li><NavLink to="/admin/blogs"> <FaCloud /> Blogs  </NavLink></li>

                </ul>
            </nav>
        </div>
   
   <Outlet />  </>
  )
}

export default Adminlayout