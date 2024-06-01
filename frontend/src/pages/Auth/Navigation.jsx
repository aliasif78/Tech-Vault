// import React from 'react'
import { useState } from 'react'
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Navigation.css'

export const Navigation = () => {
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