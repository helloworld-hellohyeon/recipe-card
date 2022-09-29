import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);
dayjs.extend(utc);

export type DateType = dayjs.Dayjs;

export const parse = (date: string): DateType => {
  return dayjs(date).tz("Asia/Seoul");
};

export const getDaysLeft = (date: string): number => {
  return dayjs(date).tz("Asia/Seoul").diff(dayjs().tz("Asia/Seoul"), "days");
};

export const format = (
  date: string | Date | DateType,
  _format: string
): string => {
  return dayjs(date).tz("Asia/Seoul").format(_format);
};

export const compare = (
  date1: string | Date | DateType,
  date2: string | Date | DateType
): number => {
  if (dayjs(date1).tz("Asia/Seoul").isAfter(date2, "date")) {
    return 1;
  } else if (dayjs(date1).tz("Asia/Seoul").isSame(date2, "date")) {
    return 0;
  } else {
    return -1;
  }
};
