import User from '../models/userModel.js';
import { ErrorMessages, StatusCodes } from '../utils/constants.js';
import Book from '../models/bookModel.js'
import Borrow from '../models/borrowModel.js';


export const getBooksUser = async (req, res) => {
  try {
    const books = await Book.find({ isArchived: false }).sort({ createdAt: -1 });
    if (books.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.NO_BOOKS_FOUND,
      })
    }
    res.status(StatusCodes.OK).json({
      message: ErrorMessages.BOOKS_FETCHED_SUCCESSFULLY,
      books,
    })

  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_FETCH_BOOKS,
      error: err.message,
    })
  }
}

export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.userId
    
    const book = await Book.findById(bookId)
    
    if (!book) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.BOOK_NOT_FOUND
      })
    }

    if (book.available <= 0 || book.isArchived) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ErrorMessages.BOOK_UNAVAILABLE
      })
    }

    const alreadyBorrowed = await Borrow.findOne({ user: userId, book: bookId, returnedAt: null })
    if (alreadyBorrowed) {
      return res.status(StatusCodes.CONFLICT).json({
        message: ErrorMessages.BOOK_ALREADY_BORROWED,
      })
    }

    const borrowDate = new Date()
    const dueDate = new Date(borrowDate.getTime() + book.dueDays * 24 * 60 * 60 * 1000);

    const borrowRecord = await Borrow.create({
      user: userId,
      book: book._id,
      borrowedAt: borrowDate,
      dueDate
    })

    book.available -= 1
    book.save()
    await User.findByIdAndUpdate(userId, {
      $push: { borrowedBooks: borrowRecord._id },
    });
    res.status(StatusCodes.CREATED).json({
      message: 'Book borrowed successfully',
      borrow: borrowRecord,
    });


  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to borrow book',
      error: err.message,
    });
  }
}


export const returnBook = async (req, res) => {
  try {
    const userId = req.userId;
    const { borrowId } = req.params;

    const borrow = await Borrow.findOne({
      _id: borrowId,
      user: userId,
      returnedAt: null,
    }).populate('book');

    if (!borrow) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.BORROW_NULL,
      });
    }

    const returnDate = new Date();
    const dueDate = new Date(borrow.dueDate);
    let fineAmount = 0;

    if (returnDate > dueDate) {
      const daysLate = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
      fineAmount = daysLate * 50;
    }

    borrow.returnedAt = returnDate;
    borrow.fine = fineAmount;
    borrow.finePaid = fineAmount === 0
    await borrow.save();

    borrow.book.available += 1;
    await borrow.book.save();

    res.status(StatusCodes.OK).json({
      message: ErrorMessages.RETURN_SUCCESS ,
      borrow,
    });

  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:ErrorMessages.RETURN_FAIL ,
      error: err.message,
    });
  }
};


export const getUserBorrowHistory = async (req, res) => {
  try {
    const userId = req.userId; 

    const borrowRecords = await Borrow.find({ user: userId })
      .populate('book', 'title author genre')
      .sort({ borrowedAt: -1 });

    if (borrowRecords.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.NO_BORROW_HISTORY,
      });
    }

    res.status(StatusCodes.OK).json({
      message: ErrorMessages.BORROW_HISTORY_FETCHED,
      history: borrowRecords,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_FETCH_BORROW_HISTORY,
      error: err.message,
    });
  }
};
