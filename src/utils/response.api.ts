/** @format */

export const success = (
  res: any,
  message: any,
  data: any,
  status_code: number = 200,
) => {
  return res.status(status_code).json({
    message,
    error: false,
    code: status_code,
    data,
  });
};

export const error = (res: any, message: any, status_code: number = 500) => {
  return res.status(status_code).json({
    message,
    error: true,
    code: status_code,
    data: null,
  });
};
