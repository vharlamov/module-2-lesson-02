import PropTypes from "prop-types"

const getPhrase = (num) => {
  const str = String(num)
  const length = str.length

  if (str[0] === "0") {
    return "Сегодня никто с тобой не тусует"
  }
  if (str[0] === "1" && length === 1) {
    return `Сегодня с тобой тусует 1 человек`
  }
  if (str[length - 2] === "1" && length > 1) {
    return `Сегодня с тобой тусуют ${num} человек`
  }
  if (["2", "3", "4"].includes(str[length - 1])) {
    return `Сегодня с тобой тусуют ${num} человека`
  }
  return `Сегодня с тобой тусуют ${num} человек`
}

const StatusBar = ({ users }) => {
  return (
    <button
      type="button"
      className={`btn btn-${
        String(users.length)[0] === "0" ? "danger" : "primary"
      }`}
    >
      {getPhrase(users.length)}
    </button>
  )
}

StatusBar.propTypes = {
  users: PropTypes.array.isRequired
}

export default StatusBar
