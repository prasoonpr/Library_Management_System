import express from 'express';
import { getBooksUser,borrowBook ,returnBook,getUserBorrowHistory,getCurrentBorrowedByUser,getCurrentFines} from '../controllers/userControllers.js';
import { addToWishlist,removeFromWishlist,getUserWishlist } from '../controllers/userWIshlistControllers.js';
const router = express.Router()

router.get('/books',getBooksUser)
router.get('/books/borrow',getUserBorrowHistory)
router.get('/books/borrow/current',getCurrentBorrowedByUser)
router.post('/books/borrow/:bookId',borrowBook)
router.post("/books/return/:borrowId",returnBook)
router.post('/books/addtowishlist/:bookId',addToWishlist)
router.delete('/books/removefromwishlist/:bookId',removeFromWishlist)
router.get('/whishlist',getUserWishlist)

router.get('/books/borrow/fines',getCurrentFines)



export default router