export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
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


};
