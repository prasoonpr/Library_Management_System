
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import userRoutes from './routes/userRoutes'
import { Toaster } from 'sonner';


const routes=[...userRoutes]
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
