import { Link } from "react-router-dom"
import { useHistory } from "react-router"
import PropTypes from "prop-types"

const UserCard = ({ users, id }) => {
  const user = users.find((user) => user._id === id)
  const history = useHistory()
  const handleClick = () => {
    history.push("/users")
  }

  return (
    <>
      <h1>{user.name}</h1>
      <h2>Профессия: {user.profession.name}</h2>
      {user.qualities.map((qual) => (
        <span key={qual._id} className={`badge bg-${qual.color} me-2`}>
          {qual.name}
        </span>
      ))}
      <p>Completed meetings: {user.completedMeetings}</p>
      <h2>Rate: {user.rate}</h2>
      <button onClick={handleClick}>Все пользователи</button>
    </>
  )
}

UserCard.propTypes = {
  users: PropTypes.array,
  id: PropTypes.string
}

export default UserCard
