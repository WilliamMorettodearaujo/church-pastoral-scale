export function cleanData(value: string): string {
  return value.replace(/[^\d]/g, "");
}
