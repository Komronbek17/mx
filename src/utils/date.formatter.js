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
