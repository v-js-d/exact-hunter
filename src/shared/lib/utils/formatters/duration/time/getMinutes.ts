export function getMinutes(time: number) {
  return Math.floor(time / 60) % 60;
}
