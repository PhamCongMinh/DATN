export const saltBcrypt = 12;

export enum AuthErrorMessage {
  NoExist = 'Account does not exist',
  InvalidUser = 'Opps! Your email or password is not correct. Please try again',
  UserExist = 'Email exist. Please choose another email for register',
  PasswordNotMatch = 'Password and confirm password is not match. Please try again',
}
