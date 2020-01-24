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
  const dateObject = new Date(date)
  const month = MONTHS[dateObject.getMonth()]
  const day = dateObject.getDate()
  const year = dateObject.getFullYear()
  return `${month} ${day}, ${year}`
}
