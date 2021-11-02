export default function formatDate(date) {
  const created = new Date(+date)
  const current = new Date()
  const diffTime = (current - created) / 1000
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
  ]

  const formatNull = (data) => {
    const dataStr = String(data)
    return dataStr.length < 2 ? "0" + dataStr : dataStr
  }

  switch (true) {
    case diffTime / 60 <= 10:
      return ` - ${Math.floor(diffTime / 60)} минут назад`
    case diffTime / 3600 < 1 && diffTime / 3600 > 0.5:
      return ` - 30 минут назад`
    case diffTime / 86400 < 1:
      return ` - ${formatNull(created.getHours())}:${formatNull(
        created.getMinutes()
      )}`
    case diffTime / 2592000 < 1:
      return ` - ${created.getDay()} ${months[created.getMonth()]}`
    case diffTime / 2592000 > 1:
      return ` - ${created.getDay()} ${
        months[created.getMonth()]
      } ${created.getFullYear()}`
  }
}
