export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username or password";
  static WRONG_CONNECTION_STRING = "Wrong server name/connection string";
  static CANNOT_CONNECT_MONGODB = "Cannot connect to MongoDB";
  static USER_EXIST = "User already exists";
  static CANNOT_FIND_USER = "Cannot find user";
  static CANNOT_REGISTER_USER = "Cannot register user";
  static WRONG_EMAIL_AND_PASSWORD = "Wrong email and password";
  static UPDATE_USER_ERROR = "Update user failed";
  static INPUT_DATA_ERROR = "Input error";
  static WRONG_OLD_PASSWORD = "Old password wrong";
  static INPUT_ERROR = "Input error format";
  static PRODUCT_EXIST = "Product already exists";
  static USER_IS_NOT_ACTIVE = "User is not active please check your email";
  static CANNOT_FIND_REFRESH_TOKEN_IN_USER =
    "No user found with the provided refreshToken";
  static CANNOT_WRONG_RESET_PASSWORD_TOKEN = "Wrong reset token Password";
  static PASSWORD_NOT_MATCH = "Password is not match";
  static PRODUCT_NOT_FOUND = "Product not found";
  static PRODUCT_UPDATE_FAILED = "Product update failed";
  static SEARCH_PARAMS_IS_NOT_FOUND = "Search params is not found";
  static INVALID_OBJECT_ID = "Invalid object ID";
  static INVALID_INPUT_TYPE = "Invalid input type value";
  static ID_NOT_FOUND = "ID is not found";
  static NAME_NOT_FOUND = "Name is required for the search.";
  static REFRESH_TOKEN_EXPIRED = "Refresh token was expired";
  static REFRESH_TOKEN_INVALID = "Refresh token is invalid";
  static PERMISSION_DENIED = "Permission denied";
  static CATEGORY_NOT_FOUND = "Category is not found";
  static CATEGORY_EXIST = "Category is exists";
  static DELETE_USER_ERROR = "Delete user error";
  static FEEDBACK_NOT_FOUND = "Feedback not found";
  static CREATE_CATEGORY_ERROR = "Create category error";
  static UPDATE_CATEGORY_ERROR = "Update category error";
  static DELETE_CATEGORY_ERROR = "Delete category error";
  static CREATE_FEEDBACK_ERROR = "Create feedback error";
  static FEEDBACK_NOT_FOUND_ERROR = "Feedback not found";
  static UPDATE_FEEDBACK_ERROR = "Update feedback error";
  static DELETE_FEEDBACK_ERROR = "Delete feedback error";
  static DISCOUNT_NOT_FOUND = "Discount not found";
  static DISCOUNT_EXIST = "Discount exists";
  static CREATE_DISCOUNT_ERROR = "Create discount error";
  static UPDATE_DISCOUNT_ERROR = "Update discount error";
  static DELETE_DISCOUNT_ERROR = "Delete discount error";
  constructor(message, validationErrors = {}) {
    super(message);
    console.log("File Exception.js:", message);
    this.validationErrors = validationErrors;
  }
}
