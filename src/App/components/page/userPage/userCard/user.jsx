import React from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router"
import { useEffect } from "react/cjs/react.development"
import QualitiesCard from "./qualitiesCard"
import MeetingsCard from "./meetingsCard"
import UserCard from "./userCard"

const User = ({ user }) => {
  const history = useHistory()

  const handleClick = () => {
    history.push(`/users/${user._id}/edit`)
  }

  return Object.keys(user).length ? (
    <>
      <UserCard user={user} onClick={handleClick} />
      <QualitiesCard user={user} />
      <MeetingsCard user={user} />
    </>
  ) : (
    <p>Loading...</p>
  )
}

User.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func
}

export default User
