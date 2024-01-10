import { isString } from "@/utils/inspect.util";

export function subtractFiveHours(date) {
  const TIME_STAMP_DIF = 5 * 60 * 60 * 1000;
  const _time = new Date(date);
  const _delta = _time.setTime(_time.getTime() + TIME_STAMP_DIF);
  return new Date(_delta);
}

export default function formatDate(item) {
  const date = new Date(item);
  const year = date.getFullYear();
  const baseMonth = date.getMonth() + 1;
  const month = baseMonth < 10 ? `0${baseMonth}` : baseMonth;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${day}.${month}.${year}`;
}

export function formatDateWithDot(rawDate) {
  const date = new Date(rawDate.toString());
  const year = date.getFullYear();
  const baseMonth = date.getMonth() + 1;
  const month = baseMonth < 10 ? `0${baseMonth}` : baseMonth;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${day}.${month}.${year}`;
}

// export function formatDateWithSlash(rawDate) {
//     const date = new Date(rawDate.toString());
//     const year = date.getFullYear();
//     const baseMonth = date.getMonth() + 1;
//     const month = baseMonth < 10 ? `0${baseMonth}` : baseMonth;
//     const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
//     const {hours, minutes} = dateProperties(rawDate, "string");
//     return `${day}/${month}/${year} ${hours}:${minutes}`;
// }

export function getCreatedDate(time) {
  const _sTime = subtractFiveHours(time);
  const _slashTime = formatDateWithDot(_sTime);
  const { hours, minutes } = dateProperties(_sTime);
  return _slashTime + ` ${addZero(hours)}:${addZero(minutes)}`;
}

export const monthsNameList = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
export const weekDaysNameList = [];

export function getDaysInMonth(date) {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  return new Date(year, month, 0).getDate();
}

export function dateConvertor(date) {
  return new Date(date);
}

export function dateProperties(point, type = "date") {
  let date;
  if (type === "date") {
    date = point;
  } else if (type === "string") {
    const undefinedState = [null, undefined, ""];
    if (undefinedState.includes(point)) {
      date = new Date();
    } else {
      date = new Date(point);
    }
  }

  const ymd = formatDateToYMD(date);
  const hms = formatDateToHMS(date);
  const ymdHms = ymd + " " + hms;

  const time = date.getTime();
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const starter = formatDateToYMD(new Date(year, month, 1));
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const lastDateOfMonth = lastDayOfMonth.getDate();
  const isLastDayOfMonth = lastDateOfMonth === dayOfMonth;
  const nextMonthOfDate = new Date(date).setMonth(date.getMonth() + 1);
  const nextMonthYmd = formatDateToYMD(new Date(nextMonthOfDate));
  const current = new Date();
  const currentYear = current.getFullYear();
  const isCurrentYear = currentYear === year;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return {
    ymd,
    hms,
    ymdHms,

    year,
    time,
    month,
    starter,
    dayOfWeek,
    dayOfMonth,
    nextMonthYmd,
    lastDayOfMonth,
    lastDateOfMonth,
    nextMonthOfDate,
    isLastDayOfMonth,

    current,
    currentYear,
    isCurrentYear,

    hours,
    minutes,
    seconds,
  };
}

export function addZero(n) {
  return n <= 9 ? "0" + n : n;
}

export function formatDateToHM(date = new Date()) {
  if (isString(date)) {
    date = new Date(date);
  }
  let h = date.getHours();
  let m = date.getMinutes();
  return addZero(h) + ":" + addZero(m);
}

export function formatDateToHMS(date = new Date()) {
  if (isString(date)) {
    date = new Date(date);
  }
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  return addZero(h) + ":" + addZero(m) + ":" + addZero(s);
}

export function formatDateToYMD(date = new Date()) {
  if (isString(date)) {
    date = new Date(date);
  }
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  return "" + y + "-" + addZero(m) + "-" + addZero(d);
}

export function datesAreOnSameDay(first, second) {
  if (typeof first === "string") {
    first = new Date(first);
  }

  if (typeof second === "string") {
    second = new Date(second);
  }

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

export function isGivenDay(date, day = 1) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid argument: you must provide a "date" instance');
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - day);

  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

export function isYesterday(date) {
  return isGivenDay(date);
}
