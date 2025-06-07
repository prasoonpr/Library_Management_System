import express from 'express';
import { getBooksUser,borrowBook ,returnBook,getUserBorrowHistory} from '../controllers/userControllers.js';

const router = express.Router()

router.get('/books',getBooksUser)
router.get('/books/borrow',getUserBorrowHistory)
router.post('/books/borrow/:bookId',borrowBook)
router.post("/books/return/:borrowId",returnBook)


export default router