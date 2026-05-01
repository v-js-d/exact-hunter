import { getDays, getHours, getMinutes, getSeconds } from './time';

export function useFormatDuration() {
  return {
    getDays,
    getHours,
    getMinutes,
    getSeconds,
  };
}
