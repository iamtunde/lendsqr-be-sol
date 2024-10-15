/** @format */

export const generateRandomString = (length: number = 30) => {
  let string: string;
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    string += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return string.replace("undefined", "");
};

export const generateRandomPhoneNumbers = () => {
  return Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
};

export const generateRandomNumber = (length: number = 5) => {
  let result = "";
  const digits = "0123456789";

  for (let i = 0; i < length; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return result;
};
