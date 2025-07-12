export function toIndoTimezone(dateStr, timezone) {
  const date = new Date(dateStr)
  let offset = 7
  if (timezone === 'WITA') offset = 8
  if (timezone === 'WIT') offset = 9
  // UTC + offset
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000)
  const local = new Date(utc + (offset * 60 * 60 * 1000))
  return local.toLocaleString('id-ID', { hour12: false }) + ` (${timezone})`
} 