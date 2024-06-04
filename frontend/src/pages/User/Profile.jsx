import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useProfileMutation } from '../../redux/api/usersApiSlice'

const Profile = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { userInfo } = useSelector(state => state.auth)
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

  useEffect(() => {
    setUsername(userInfo.username)
    setEmail(userInfo.email)
  }, [userInfo.username, userInfo.email])

  const dispatch = useDispatch()

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
            const res = await updateProfile({ _id: userInfo._id, username, email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            toast.success('Profile updated successfully.')
        }

        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
}

  return (
    <div className='contianer mx-auto p-4 mt-[3rem]'>
      <div className="flex flex-col justify-center align-middle items-center md:flex md:space-x-4">
        <h2 className='text-2xl font-semibold mb-8 text-white'>Update Profile</h2>

        <div className='md:w-1/3'>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className='block text-white mb-2'>Username</label>
              <input type="text" className='form-input p-1 rounded-sm w-full' value={username} onChange={e => setUsername(e.target.value)} />
            </div>

            <div className="mb-4">
              <label className='block text-white mb-2'>Email</label>
              <input type="text" className='form-input p-1 rounded-sm w-full' value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="mb-4">
              <label className='block text-white mb-2'>Password</label>
              <input type="password" className='form-input p-1 rounded-sm w-full' value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="mb-4">
              <label className='block text-white mb-2'>Confirm Password</label>
              <input type="password" className='form-input p-1 rounded-sm w-full' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            <div className='flex justify-between'>
              <button type='submit' className='bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700'>Save</button>

              <Link to='/user-orders' className='bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700'>My Orders</Link>
            </div>
          </form>
        </div>

        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  )
}

export default Profile
