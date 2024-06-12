import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

// Private Route
import PrivateRoute from './components/PrivateRoute.jsx'

// Auth
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoutes from './pages/Admin/AdminRoutes.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import Home from './Home.jsx'
import Favourites from './pages/Products/Favourites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route index={true} path='/' element={<Home />}></Route>
      <Route path='/favourites' element={<Favourites />}></Route>
      <Route path='/product/:id' element={<ProductDetails />}></Route>

      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />}></Route>
      </Route>

      {/* Admin Routes */}
      <Route path='/admin' element={<AdminRoutes />}></Route>
      <Route path='/admin/userlist' element={<UserList />}></Route>
      <Route path='/admin/categorylist' element={<CategoryList />}></Route>
      <Route path='/admin/productlist' element={<ProductList />}></Route>
      <Route path='/admin/product/allproducts' element={<AllProducts />}></Route>
      <Route path='/admin/product/update/:_id' element={<ProductUpdate />}></Route>
    </Route>))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)