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
