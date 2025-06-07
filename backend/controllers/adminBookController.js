import Book from '../models/bookModel.js'
import { ErrorMessages, StatusCodes } from '../utils/constants.js'
import Borrow from '../models/borrowModel.js';

export const getBooks = async (req,res)=>{
    try {
    const books = await Book.find().sort({ createdAt: -1 });
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

export const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      quantity,
      available,
      publishedDate,
      description,
      dueDays
    } = req.body

    const IsExist = await Book.findOne({ title, author })
    if (IsExist) {
      return res.status(StatusCodes.CONFLICT).json({
        message: ErrorMessages.BOOK_ALREADY_EXISTS,
      })
    }
    let isbn;
    let isUnique = false;

    while (!isUnique) {
      isbn = generateISBN();
      const exists = await Book.findOne({ isbn });
      if (!exists) isUnique = true;
    }

    const book = await Book.create({
      title,
      author,
      genre,
      quantity,
      available,
      publishedDate,
      description,
      dueDays,
      isbn
    })

    const { ...safeBook } = book.toObject()

    res.status(StatusCodes.CREATED).json({
      message: ErrorMessages.BOOK_ADDED_SUCCESSFULLY,
      book: safeBook,
    })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_ADD_BOOK,
      error: err.message,
    })
  }
}

export const editBook = async (req, res) => {
  try {
    const { id } = req.params
    console.log(req.body)
    const updateData = req.body
    let  book =await  Book.findById(id)
        if(!book) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.NO_BOOKS_FOUND,
      })}
    const IsExist = await Book.findOne({
      title: updateData.title,
      author: updateData.author,
      _id: { $ne: id }
    })
    if (IsExist) {
      return res.status(StatusCodes.CONFLICT).json({
        message: ErrorMessages.BOOK_ALREADY_EXISTS,
      })
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!updatedBook) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.BOOK_NOT_FOUND,
      })
    }

    const { ...editBook } = updatedBook.toObject()
    res.status(StatusCodes.OK).json({
      message: ErrorMessages.BOOK_UPDATED_SUCCESSFULLY,
      book: editBook,
    })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_UPDATE_BOOK,
      error: err.message,
    })
  }
}

export const archiveBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.NO_BOOKS_FOUND,
      });
    }

    book.isArchived = true;
    await book.save();

    res.status(StatusCodes.OK).json({
      message: ErrorMessages.BOOK_ARCHIVED_SUCCESSFULLY,
      book: book.toObject(),
    });

  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_ARCHIVE_BOOK,
      error: err.message,
    });
  }
};

export const unArchiveBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.NO_BOOKS_FOUND,
      });
    }

    book.isArchived = false;
    await book.save();

    res.status(StatusCodes.OK).json({
      message: ErrorMessages.BOOK_UNARCHIVED_SUCCESSFULLY, 
      book: book.toObject(),
    });

  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_UNARCHIVE_BOOK, 
      error: err.message,
    });
  }
};



export const getAllBorrowHistory = async (req, res) => {
  try {
    const borrowList = await Borrow.find()
      .populate('user', 'name email')
      .populate('book', 'title author')
      .sort({ borrowedAt: -1 });

    if (!borrowList.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.NO_BORROW_HISTORY,
      });
    }

    res.status(StatusCodes.OK).json({
      message: ErrorMessages.BORROW_HISTORY_FETCHED,
      history: borrowList,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_FETCH_BORROW_HISTORY,
      error: err.message,
    });
  }
};

export const BorrowHistory = async (req, res) => {
  try {
    const borrowList = await Borrow.find({ returnedAt: null }) // 🔍 only currently borrowed
      .populate('user', 'name email')
      .populate('book', 'title author')
      .sort({ borrowedAt: -1 });

    if (!borrowList.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.NO_BORROW_HISTORY,
      });
    }

    res.status(StatusCodes.OK).json({
      message: ErrorMessages.BORROW_HISTORY_FETCHED,
      history: borrowList,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_FETCH_BORROW_HISTORY,
      error: err.message,
    });
  }
};



export const payFineForBorrow = async (req, res) => {
  try {
    const { borrowId } = req.params;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.BORROW_NOT_FOUND,
      });
    }

    if (borrow.finePaid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ErrorMessages.FINE_ALREADY_PAID,
      });
    }

    borrow.finePaid = true;
    await borrow.save();

    res.status(StatusCodes.OK).json({
      message: ErrorMessages.FINE_PAID_SUCCESSFULLY,
      borrow,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_PAY_FINE,
      error: err.message,
    });
  }
};