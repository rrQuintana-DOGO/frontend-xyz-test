import moment from "moment";

export function transformStringToDateFormat(str: string): string {
  const date = new Date(Number(str) * 1000);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  };
  return date.toLocaleString('en-GB', options);
}

export function transformStringToDate(str: string): number {
  return Math.floor(new Date(str).getTime() / 1000);
}

export function transformStringToMoment(str: string): moment.Moment {
  const date = new Date(Number(str) * 1000);
  return moment(date)

}