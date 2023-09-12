function pad(number: number, maxLength: number) {
  return number.toString().padStart(maxLength, "0");
}

export function formatTimestamp(timestamp: Date): string {
  const YYYY = pad(timestamp.getFullYear(), 4);
  const MM = pad(timestamp.getMonth() + 1, 2);
  const DD = pad(timestamp.getDate(), 2);
  const hh = pad(timestamp.getHours(), 2);
  const mm = pad(timestamp.getMinutes(), 2);
  const ss = pad(timestamp.getSeconds(), 2);
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
}
