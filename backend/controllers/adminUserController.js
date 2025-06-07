import User from '../models/userModel.js';
import { ErrorMessages, StatusCodes } from '../utils/constants.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    if (users.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.NO_USERS_FOUND,
      });
    }

    res.status(StatusCodes.OK).json({
      message: ErrorMessages.USERS_FETCHED_SUCCESSFULLY,
      users,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_FETCH_USERS,
      error: err.message,
    });
  }
};

export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.USER_NOT_FOUND,
      });
    }

    user.isBlocked = true;
    await user.save();

    res.status(StatusCodes.OK).json({
      message: ErrorMessages.USER_BLOCKED_SUCCESSFULLY,
      user: user.toObject(),
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_BLOCK_USER,
      error: err.message,
    });
  }
};

export const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ErrorMessages.USER_NOT_FOUND,
      });
    }

    user.isBlocked = false;
    await user.save();

    res.status(StatusCodes.OK).json({
      message: ErrorMessages.USER_UNBLOCKED_SUCCESSFULLY,
      user: user.toObject(),
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.FAILED_TO_UNBLOCK_USER,
      error: err.message,
    });
  }
};