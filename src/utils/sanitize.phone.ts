/** @format */

export const removePlusSign = (string: string) => {
  return string.replace("+", "");
};

export const includePlusSign = (string: string) => {
  return `+${string}`;
};

export const createNubanFromPhone = (string: string) => {
  return string.replace("234", "");
};
