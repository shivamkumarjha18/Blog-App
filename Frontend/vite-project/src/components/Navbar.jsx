import React, { useState } from 'react'
import { Button } from './ui/button'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import logo from "../assets/logo.png"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { toggleTheme } from '../redux/themeSlice'; // path adjust karo apne project ke hisaab se
import { setUser } from '../redux/authSlice'
import userLogo from "../assets/user.jpg"
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { LiaCommentSolid } from 'react-icons/lia'
import { FaEdit, FaMoon, FaRegEdit, FaSun } from 'react-icons/fa'
import store from '@/redux/store'
import {
    ChartColumnBig,
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Search,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Navbar() {


    const { user } = useSelector(store => store.auth)
    const { theme } = useSelector(store => store.theme)
    const [openNav, setOpenNav] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const logoutHandler = async (e) => {

        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, { withCredentials: true });
            console.log(res)
            if (res.data.success) {
                navigate("/")
                dispatch(setUser(null))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)

        }
    }

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('')
        }
    };
    return (
        <div className='py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0'>
                {/* logo section */}
                <div className='flex gap-7 items-center'>
                    <Link to={'/'}>
                        <div className='flex gap-2 items-center'>
                            <img src={logo} alt="" className='w-7 h-7 md:w-10 md:h-10 dark:invert' />
                            <h1 className='font-bold text-3xl md:text-4xl'>Logo</h1>
                        </div>
                    </Link>
                    <div className='relative hidden md:block'>
                        <Input type="text"
                            placeholder="Search"
                            className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button className='absolute right-0 top-0' onClick={handleSearch}><Search /> </Button>
                    </div>

                </div>
                {/* nav section */}
                <nav className='flex md:gap-7 gap-4 items-center'>
                    <ul className='hidden md:flex gap-7 items-center text-xl font-semibold'>
                        <NavLink to={'/'} className="cursor-pointer"><li>Home</li></NavLink>
                        <NavLink to={'/blogs'} className={`cursor-pointer`}><li>Blogs</li></NavLink>
                        <NavLink to={'/about'} className={`cursor-pointer`}><li>About</li></NavLink>
                        {/* <NavLink to={'/write-blog'} className={`cursor-pointer`}><li>Write a Blog</li></NavLink> */}
                    </ul>



                    <Button onClick={() => dispatch(toggleTheme())} className="">
                        {
                            theme === 'light' ? <FaMoon /> : <FaSun />
                        }

                    </Button>
                    {
                        user ? <div className='ml-7 md:flex gap-2 '>



                           <DropdownMenu className="">
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user.photoUrl || userLogo} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 dark:bg-gray-800">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                                                <User />
                                                <span>Profile</span>
                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard/your-blog')}>
                                                <ChartColumnBig />
                                                <span>Your Blog</span>
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard/comments')}>
                                                <LiaCommentSolid />
                                                <span>Comments</span>
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => navigate('/dashboard/write-blog')}>
                                                <FaRegEdit />
                                                <span>Write Blog</span>
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={logoutHandler}>
                                            <LogOut />
                                            <span>Log out</span>
                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            <Button onClick={logoutHandler}>Logout</Button>

                        </div> : <div className='ml-7 md:flex gap-2 '>
                            <Link to={'/login'}><Button>Login</Button></Link>
                            <Link className='hidden md:block' to={'/signup'}><Button>Signup</Button></Link>
                        </div>
                    }

                </nav>

            </div>
        </div>
    )
}

export default Navbar