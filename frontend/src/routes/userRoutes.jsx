import { Outlet } from "react-router-dom"
import Navbar from "../components/userComponents/Navbar"
import HomePage from "../pages/userPages/HomePage"
import BorrowedPage from "../pages/userPages/BorrowedPage"
import HistoryPage from "../pages/userPages/HistoryPage"
import FinesPage from "../pages/userPages/FinesPage"
import WishlistPage from "../pages/userPages/WishlistPage"
import LoginPage from "../pages/userPages/LoginPage"
import RegistrationPage from "../pages/userPages/RegistrationPage"
import Authenticated from "../utils/protectedRoutes/authenticated"

const userRoutes=[
    {
        path:'/',
        element:(
            <>
            <Navbar/>
             <div className="pt-10"> 
                <Outlet />
            </div>
            </>
        ),
        children:[
            {
                path:'/',
                element:<HomePage/>
            },
            {
                path:'/borrowed',
                element:<BorrowedPage/>
            },
            {
                path:'/history',
                element:<HistoryPage/>
            },
            {
                path:'/fines',
                element:<FinesPage/>
            },
            {
                path:'/wishlist',
                element:<WishlistPage/>
            },
            {
                path:'/login',
                element:<Authenticated><LoginPage/></Authenticated>
            },
            {
                path:'/register',
                element:<Authenticated><RegistrationPage/></Authenticated>
            }
        ]
    }
]

export default userRoutes