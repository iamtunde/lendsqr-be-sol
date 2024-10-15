/** @format */

import dayjs from "dayjs";

export const isTimeExpired = (
  expiryDate: string,
  currentDate: string = null,
) => {
  const now = currentDate ? dayjs(currentDate) : dayjs();
  const expiration = dayjs(expiryDate);

  return expiration.isBefore(now, "day");
};
