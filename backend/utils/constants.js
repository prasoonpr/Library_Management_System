export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const ErrorMessages = {
  //Registration
  EMAIL_EXISTS: 'Email already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  REGISTRATION_FAILED: 'Registration failed',
  REGISTRATION_SUCCESS: 'Registration successful! Please login to continue.',
  //Login
  LOGIN_FAILED: 'Login failed',
  NO_TOKEN_PROVIDED: 'No token provided',
  INVALID_ACCESS_TOKEN: 'Invalid or expired access token',
  INVALID_REFRESH_TOKEN: 'Invalid or expired refresh token',
  LOGIN_SUCCESS: 'Login successful',
  //Admmin Login
  ACCESS_DENIED: 'Access denied: Admins only',
  //Admin Book Section
  BOOK_ALREADY_EXISTS: 'A book with the same title and author already exists.',
  BOOK_NOT_FOUND: 'Book not found.',
  FAILED_TO_ADD_BOOK: 'Failed to add book.',
  FAILED_TO_UPDATE_BOOK: 'Failed to update book.',
  BOOK_ADDED_SUCCESSFULLY: 'Book added successfully.',
  BOOK_UPDATED_SUCCESSFULLY: 'Book updated successfully.',
  
  BOOKS_FETCHED_SUCCESSFULLY: 'Books fetched successfully',
  FAILED_TO_FETCH_BOOKS: 'Failed to fetch books',
  
  BOOK_ARCHIVED_SUCCESSFULLY: 'Book archived successfully',
  BOOK_UNARCHIVED_SUCCESSFULLY: 'Book unarchived successfully.',

  FAILED_TO_ARCHIVE_BOOK: 'Failed to archive book',
  FAILED_TO_UNARCHIVE_BOOK: 'Failed to unarchive book.',
  NO_BOOKS_FOUND: 'No book found with the provided ID.',

  //ADmin User Messages
  NO_USERS_FOUND: 'No users found.',
  USERS_FETCHED: 'Users fetched successfully.',
  FAILED_TO_FETCH_USERS: 'Failed to fetch users.',
  USER_BLOCKED_SUCCESSFULLY: 'User has been blocked successfully.',
  FAILED_TO_BLOCK_USER: 'Failed to block the user.',
  USER_UNBLOCKED_SUCCESSFULLY: 'User has been unblocked successfully.',
  FAILED_TO_UNBLOCK_USER: 'Failed to unblock the user.',


};
