import Wishlist from '../models/wishListModel.js'
import Book from '../models/bookModel.js'
import { StatusCodes, ErrorMessages } from "../utils/constants.js";

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.userId
    const { bookId } = req.params

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.BOOK_NOT_FOUND,
      })
    }

    const alreadyAdded = await Wishlist.findOne({ user: userId, book: bookId });
    if (alreadyAdded) {
      return res.status(StatusCodes.CONFLICT).json({
        message: ErrorMessages.BOOK_ALREADY_IN_WISHLIST,
      })
    }

    const wishlistEntry = await Wishlist.create({ user: userId, book: bookId })
    return res.status(StatusCodes.CREATED).json({
      message: ErrorMessages.BOOK_ADDED_TO_WISHLIST,
      wishlist: wishlistEntry,
    })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_ADD_WISHLIST,
      error: err.message,
    })
  }
}

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.userId
    const { bookId } = req.params

    const removed = await Wishlist.findOneAndDelete({ user: userId, book: bookId });

    if (!removed) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.BOOK_NOT_IN_WISHLIST,
      });
    }

    return res.status(StatusCodes.OK).json({
      message: ErrorMessages.BOOK_REMOVED_FROM_WISHLIST,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_REMOVE_WISHLIST,
      error: err.message,
    })
  }
}



export const getUserWishlist = async (req, res) => {
  try {
    const userId = req.userId

    const wishlist = await Wishlist.find({ user: userId }).populate('book')

    if (wishlist.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.WISHLIST_EMPTY,
      })
    }

    return res.status(StatusCodes.OK).json({
      message: ErrorMessages.WISHLIST_FETCH_SUCCESS,
      wishlist,
    })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_FETCH_WISHLIST,
      error: err.message,
    })
  }
}
