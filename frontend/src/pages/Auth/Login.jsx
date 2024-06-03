import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { FaClosedCaptioning } from 'react-icons/fa'

const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const { userInfo } = useSelector(state => state.auth)
    const search = useLocation()
    const sp = new URLSearchParams(search)

    // Redirect the user to the Home Page
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
            console.log(userInfo)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await login({ email, password }).unwrap()
            console.log(res)
            dispatch(setCredentials({ ...res }))
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }


    return (
        <div>
            <section className='pl-[10rem] flex flex-wrap text-white'>
                <div className='mt-[5rem]'>
                    <h1 className='text-2xl font-semibold mb-4'>Sign In</h1>

                    <form className='container w-[40rem]' onSubmit={submitHandler}>
                        <div className="my-[1.75rem]">
                            <label htmlFor="email" className='block text-sm font-medium text-white'>Email Address</label>

                            <input type="email" id='email' className='mt-1 p-1 border rounded w-[70%] text-black' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="my-[1.75rem]">
                            <label htmlFor="password" className='block text-sm font-medium text-white'>Password</label>

                            <input type="password" id='password' className='mt-1 p-1 border rounded w-[70%] text-black' value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <button disabled={isLoading} type='submit' className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[0.5rem]'>{isLoading ? "Signing In..." : "Sign In"}</button>

                        {isLoading && <Loader />}
                    </form>

                    <div className="">
                        <p className="text-white">
                            New Customer? {" "}
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-pink-500 hover:underline'>Register</Link>
                        </p>
                    </div>
                </div>

                <img src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='transform scale-x-[-1] w-[41%] h-[31rem] mt-[2rem] xl:block md:hidden sm:hidden rounded-lg' />
            </section>
        </div>
    )
}

export default login