import { apiSlice } from './apiSlice.js'
import { USERS_URL } from '../constants.js'

// In this, we are attaching the USERS_URL/auth to the local host URL
// Result : http://localhost:5000/api/users/auth
// This is the same route as the login route defined in the userRoutes.js 
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Use mutation when providing data to the login
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        })

        // Use query when providing no data to the login
        // login = builder.query
    })
})

// userLoginMutation is being used because of `use${Login}Mutation`
// Login is the name of the endpoint and Mutation is the method being used
export const { useLoginMutation } = userApiSlice