import Header from "../components/Header"
import { Link, useParams } from 'react-router-dom'
import { useGetProductsQuery } from "../redux/api/productApiSlice"
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from "./Products/Product"

const Home = () => {
  const { keyword } = useParams()
  const { data, isLoading, Error } = useGetProductsQuery()

  if (isLoading) {
    return <Loader />
  }

  if (Error) {
    return <h1>ERROR</h1>
  }

  console.log(keyword)


  return (
    <>
      <Header />

      {isLoading ? (<Loader />) : Error ? (<Message variant='danger'>{Error?.data.message || Error.error}</Message>) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">Special Products</h1>

            <Link to='/shop' className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]">Shop</Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )
      }
    </>
  )
}

export default Home
