import Footer from "../footer"
import Navbar from "../navbar"
import {Outlet} from "react-router-dom"

const Layout = () => {  
  return (
      <>
      <Navbar/>
      <Outlet/>
      <Footer/>
      </>
  )
}

export default Layout
