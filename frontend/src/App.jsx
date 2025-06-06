
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import userRoutes from './routes/userRoutes'
import { Toaster } from 'sonner';
import adminRoutes from './routes/adminRoutes';


const routes=[...userRoutes,...adminRoutes]
const router=createBrowserRouter(routes)

function App() {


  return (
    <>
       <Toaster position="top-right" closeButton richColors />
      <RouterProvider router={router}/>
    </>
  )
}

export default App
