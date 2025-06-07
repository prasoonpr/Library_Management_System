import AdminDashboard from "../pages/adminPages/AdminDashboard"
import BorrowHistory from "../pages/adminPages/BorrowedHistory"
import ManageBooks from "../pages/adminPages/ManageBooks"
import ManageUsers from "../pages/adminPages/ManageUsers"


const adminRoutes=[
    {
        path:'/admin/dashboard',
        element:<AdminDashboard/>
    },
    {
        path:'/admin/books',
        element:<ManageBooks/>
    },
    {
        path:'/admin/users',
        element:<ManageUsers/>
    },
    {
        path:'/admin/borrows',
        element:<BorrowHistory/>
    }
]

export default adminRoutes