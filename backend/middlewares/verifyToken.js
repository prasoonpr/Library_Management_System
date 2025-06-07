import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from '../utils/token.js';
import { StatusCodes, ErrorMessages } from '../utils/constants.js';
import User from '../models/userModel.js';

export const authenticateUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (accessToken) {
    const { valid, decoded } = verifyAccessToken(accessToken);
    if (valid) {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessages.USER_NOT_FOUND });
      }
      if (user.isBlocked) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: ErrorMessages.USER_BLOCKED });
      }

      req.userId = user._id;
      req.userRole = user.role;
      return next();
    }
  }

  if (refreshToken) {
    const { valid, decoded } = verifyRefreshToken(refreshToken);
    if (valid) {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessages.USER_NOT_FOUND });
      }
      if (user.isBlocked) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: ErrorMessages.USER_BLOCKED });
      }

      const newAccessToken = generateAccessToken(user._id, user.role);
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, 
        sameSite: 'Strict',
      });

      req.userId = user._id;
      req.userRole = user.role;
      return next();
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessages.INVALID_REFRESH_TOKEN });
    }
  }

  return res.status(StatusCodes.UNAUTHORIZED).json({ message: ErrorMessages.NO_TOKEN_PROVIDED });
};
