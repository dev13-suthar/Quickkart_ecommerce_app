import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./scenes/layout"
import Homepage from "./scenes/homepage"
import LoginPage from "./scenes/loginPage"
import RegisterPage from "./scenes/registerPage"
import { useMemo } from "react"
import {CssBaseline,ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles";
import { themeSettings } from "./theme";
import {useSelector} from "react-redux";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import ProductOverview from "./scenes/productOverview"
import Category from "./scenes/categoryPage"
import AllNewArrivals from "./scenes/AllNewArrivalPage"
import Wishlist from "./scenes/wishlist"
import MyCart from "./scenes/yourCart"
import Success from "./components/Success"
import Cancel from "./components/Cancel"
import YourOrder from "./scenes/OrdersDetail"

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:60*1000
    },
  }
})
const App = () => {
  const mode = useSelector((state)=>state.mode);
  const isAuth = useSelector((state)=>state.token)
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);

  return (
      <>
      <div className="app">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/success" element={<Success/>} />
            <Route path="/cancel" element={<Cancel/>} />
            <Route path="/home" element={<Layout/>}>
              <Route path="/home" element={isAuth ? <Homepage/>:<LoginPage/>}/>
              <Route path="/home/:id" element={<ProductOverview/>}/>
              <Route path="/home/newArrivals" element={<AllNewArrivals/>}/>
              <Route path="/home/categories/:categoryName" element={<Category/>}/>
              <Route path="/home/wishlist" element={<Wishlist/>}/>
              <Route path="/home/cart" element={<MyCart/>}/>
              <Route path="/home/orders" element={<YourOrder/>}/>
            </Route>
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
      </QueryClientProvider>
      </div>
      </>
  )
}

export default App

