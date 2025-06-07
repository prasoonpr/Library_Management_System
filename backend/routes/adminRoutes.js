import express from 'express';
import  {
    addBook,
    editBook,
    getBooks,
    archiveBook,
    unArchiveBook,
    getAllBorrowHistory,
    payFineForBorrow,
    BorrowHistory
} from "../controllers/adminBookController.js"
import  { getUsers,blockUser,unblockUser } from '../controllers/adminUserController.js';
const router = express.Router();

//books
router.get('/books',getBooks)
router.post('/books/create',addBook)
router.put('/books/edit/:id',editBook)
router.put('/books/archive/:id',archiveBook)
router.put('/books/unarchive/:id',unArchiveBook)
router.get('/books/borrow',getAllBorrowHistory)
router.get('/books/borrowOnly',BorrowHistory)
router.put('/books/borrow/:bookId',payFineForBorrow)

//user
router.get('/users',getUsers)
router.put('/users/block/:id',blockUser)
router.put('/users/unblock/:id',unblockUser)

export default router

