import { DailyRate } from "../models/exchange-rate.modal";

export function calcCloseDiff(today: DailyRate, previous: DailyRate): number {
  const diff = today.close - previous.close;
  const percent = (diff / previous.close) * 100;
  return percent;
}
