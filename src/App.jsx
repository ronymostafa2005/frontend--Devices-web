import { Routes, Route } from "react-router-dom"
import { useRouteStagger } from "./animations/useRouteStagger"
import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"
import Home from "./Components/pages/Home/Home"
import About from "./Components/pages/About/About"
import Contact from "./Components/pages/Contact/Contact"
import Products from "./Components/pages/Products/Products"
import ProductDetail from "./Components/pages/Products/ProductDetail"
import Cart from "./Components/pages/Cart/Cart"
import Login from "./Components/pages/Auth/Login"
import Register from "./Components/pages/Auth/Register"

function App() {
  const routeContentRef = useRouteStagger()

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(203,244,235,0.88)_35%,_rgba(157,237,231,0.9)_65%,_rgba(194,208,255,0.92)_100%)]">
      <Navbar />
      <div className="flex-1 px-4 pb-10 pt-4 sm:px-6 lg:px-8 lg:pb-12 xl:px-10">
        <div ref={routeContentRef} className="mx-auto w-full min-h-0 max-w-[1440px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
