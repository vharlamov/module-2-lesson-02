export default function (date) {
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

  switch (true) {
    case diffTime / 60 < 1:
      return " - 0 минут назад"
    case diffTime / 60 <= 10:
      return ` - ${Math.floor(diffTime / 60)} минут назад`
    case diffTime / 3600 < 1:
      return ` - 30 минут назад`
    case diffTime / 86400 < 1:
      return ` - ${created.getHours()}:${created.getMinutes()}`
    case diffTime / 2592000 < 1:
      return ` - ${created.getDay()} ${months[created.getMonth()]}`
    case diffTime / 2592000 > 1:
      return ` - ${created.getDay()} ${
        months[created.getMonth()]
      } ${created.getFullYear()}`
  }
}
