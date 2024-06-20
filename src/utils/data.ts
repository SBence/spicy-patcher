export function data(array: number[]) {
  return array
    .map((o) => o.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}
