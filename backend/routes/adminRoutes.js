import express from 'express';
import  {addBook,editBook ,getBooks,archiveBook,unArchiveBook} from "../controllers/adminBookController.js"
import  { getUsers,blockUser,unblockUser } from '../controllers/adminUserController.js';
const router = express.Router();

//books
router.get('/books',getBooks)
router.post('/books/create',addBook)
router.put('/books/edit/:id',editBook)
router.put('/books/archive/:id',archiveBook)
router.put('/books/unarchive/:id',unArchiveBook)

//user
router.get('/users',getUsers)
router.put('/users/block/:id',blockUser)
router.put('/users/unblock/:id',unblockUser)

export default router

