// import React from 'react'
import { useState } from 'react'
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Navigation.css'

// useSelector allows to access the Redux state
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { logout } from '../../redux/features/auth/authSlice'

export const Navigation = () => {
    const userInfo = useSelector(state => state.auth)
    const [dropDownOpen, setDropDownOpen] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)

    const toggleDropDown = () => {
        setDropDownOpen(!dropDownOpen)
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    const closeSidebar = () => {
        setShowSidebar(false)
    }

    // Dispatches actions to the Redux store
    const dispatch = useDispatch()

    // To Navigate to other Pages
    const navigate = useNavigate()
    const { logoutApiCall } = useLoginMutation()

    const logoutHandler = async () => {
        try {
            // Unwrapping allows us to handle success and errors
            await logoutApiCall().unwrap()

            // Call the logout function in the authSlice reducer 
            dispatch(logout())

            // Navigate to the login page after successfully logging out
            navigate("./login")
        }

        catch (error) {
            console.error(error)
        }
    }

    return (
        <div style={{ zIndex: 999 }} className={`xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed ${showSidebar ? 'flex' : 'hidden'}`} id='navigation-container'>
            <div className="flex flex-col justify-center space-y-4">
                <Link to='/' className='mt-10 flex items-center transition-transform transform hover:translate-x-2'>
                    <div className="w-10 h-10 mr-2 flex justify-center items-center">
                        <AiOutlineHome className='size-5' />
                    </div>

                    <span className="hidden nav-item-name">Home</span>{" "}
                </Link>

                <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <div className="w-10 h-10 mr-2 flex justify-center items-center">
                        <AiOutlineShopping className='size-5' />
                    </div>

                    <span className="hidden nav-item-name">Shop</span>{" "}
                </Link>

                <Link to='/cart' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <div className="w-10 h-10 mr-2 flex justify-center items-center">
                        <AiOutlineShoppingCart className='size-5' />
                    </div>

                    <span className="hidden nav-item-name">Cart</span>{" "}
                </Link>

                <Link to='/favourite' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <div className="w-10 h-10 mr-2 flex justify-center items-center">
                        <FaHeart className='size-5' />
                    </div>

                    <span className="hidden nav-item-name">Favourite</span>{" "}
                </Link>
            </div>

            <div className="relative">
                <button onClick={() => toggleDropDown} className='flex items-center text-neutral-800 focus:outline-none'>
                    {userInfo ? <span className='text-white'>{userInfo.username}</span> : <></>}
                </button>
            </div>

            <ul>
                <li>
                    <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2'>
                        <div className="w-10 h-10 mr-2 flex justify-center items-center">
                            <AiOutlineLogin className='size-5' />
                        </div>

                        <span className="hidden nav-item-name">Login</span>{" "}
                    </Link>
                </li>

                <li>
                    <Link to='/register' className='flex items-center transition-transform transform hover:translate-x-2'>
                        <div className="w-10 h-10 mr-2 flex justify-center items-center">
                            <AiOutlineUserAdd className='size-5' />
                        </div>

                        <span className="hidden nav-item-name">Register</span>{" "}
                    </Link>
                </li>
            </ul>
        </div>
    )
} 