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
import UserPrivate from "../utils/protectedRoutes/userPrivate"

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
                element:<UserPrivate><HomePage/></UserPrivate>
            },
            {
                path:'/borrowed',
                element:<UserPrivate><BorrowedPage/></UserPrivate>
            },
            {
                path:'/history',
                element:<UserPrivate><HistoryPage/></UserPrivate>
            },
            {
                path:'/fines',
                element:<UserPrivate><FinesPage/></UserPrivate>
            },
            {
                path:'/wishlist',
                element:<UserPrivate><WishlistPage/></UserPrivate>
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