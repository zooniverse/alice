const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export default function writeDate(date) {
  if (!date) return ''
  if (typeof date === 'string' && !date.length) return ''
  const dateObject = typeof date === 'string' ? new Date(date) : date
  const month = MONTHS[dateObject.getMonth()]
  const day = dateObject.getDate()
  const year = dateObject.getFullYear()
  return `${month} ${day}, ${year}`
}
