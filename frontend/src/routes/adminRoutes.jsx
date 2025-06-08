import AdminDashboard from "../pages/adminPages/AdminDashboard"
import BorrowHistory from "../pages/adminPages/BorrowedHistory"
import AdminLogin from "../pages/adminPages/LoginPage"
import ManageBooks from "../pages/adminPages/ManageBooks"
import ManageUsers from "../pages/adminPages/ManageUsers"
import AdminAuthenticated from "../utils/protectedRoutes/adminAuthenticated"
import AdminPrivate from "../utils/protectedRoutes/adminPrivate"


const adminRoutes=[
    {
        path:'/admin/dashboard',
        element:<AdminPrivate><AdminDashboard/></AdminPrivate>
    },
    {
        path:'/admin/books',
        element:<AdminPrivate><ManageBooks/></AdminPrivate>
    },
    {
        path:'/admin/users',
        element:<AdminPrivate><ManageUsers/></AdminPrivate>
    },
    {
        path:'/admin/borrows',
        element:<AdminPrivate><BorrowHistory/></AdminPrivate>
    },
    {
        path:'/admin',
        element:<AdminAuthenticated><AdminLogin/></AdminAuthenticated>
    }
]

export default adminRoutes