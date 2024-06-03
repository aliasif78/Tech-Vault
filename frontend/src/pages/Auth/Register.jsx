import React from 'react'
import { useState, useEffect } from 'react'
import { Link, redirectDocument, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/usersApiSlice'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector(state => state.auth)
    const search = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
            console.log(userInfo)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!password || !confirmPassword || !username || !email) {
            toast.error('Please provide complete information.')
        }

        else if (password != confirmPassword) {
            toast.error('Passwords do not match.')
        }

        else {
            try {
                const res = await register({ username, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate(redirect)
                toast.success('User successfully registered.')
            }

            catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    return (
        <section className='pl-[10rem] flex flex-row flex-wrap'>
            <div className="mt-[2.5rem]">
                <h1 className='text-2xl font-semibold mb-4 text-white'>Register</h1>

                <form className='container w-[40rem]' onSubmit={submitHandler}>
                    <div className="my-[2rem]">
                        <label htmlFor="username" className='block text-sm font-medium text-white'>Username</label>

                        <input type="username" id='username' className='mt-1 p-0.5 border rounded w-[70%] text-black' value={username} onChange={e => setUsername(e.target.value)} />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="email" className='block text-sm font-medium text-white'>Email Address</label>

                        <input type="email" id='email' className='mt-1 p-0.5 border rounded w-[70%] text-black' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="password" className='block text-sm font-medium text-white'>Password</label>

                        <input type="password" id='password' className='mt-1 p-0.5 border rounded w-[70%] text-black' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="my-[2rem]">
                        <label htmlFor="confirmPassword" className='block text-sm font-medium text-white'>Confirm Password</label>

                        <input type="password" id='confirmPassword' className='mt-1 p-0.5 border rounded w-[70%] text-black' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>

                    <button disabled={isLoading} type='submit' className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[0.5rem]'>{isLoading ? "Signing Up..." : "Sign Up"}</button>

                    {isLoading && <Loader />}
                </form>

                <div className="mt-1">
                    <p className="text-white">
                        Already have an account? {" "}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-pink-500 hover:underline'>Login</Link>
                    </p>
                </div>
            </div>

            <img src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='transform scale-x-[-1] w-[41%] h-[31rem] mt-[2rem] xl:block md:hidden sm:hidden rounded-lg' />
        </section>
    )
}

export default Register