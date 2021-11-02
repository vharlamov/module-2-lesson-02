import React, { useState, useEffect } from "react"
import { User, UserMeetings, UserQualities, Comments } from "."
import PropTypes from "prop-types"
import api from "../../../api"
import { useHistory } from "react-router"

const UserPage = ({ users, id }) => {
  const user = users.find((user) => user._id === id)
  const [comments, setComments] = useState([])
  const history = useHistory()

  useEffect(() => {
    api.comments.fetchAll().then((data) => setComments(data))
  }, [])

  const handleClick = () => {
    history.push(`/users/${id}/edit`)
  }

  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <User user={user} onClick={handleClick} />
          <UserQualities user={user} />
          <UserMeetings user={user} />
        </div>
        <div className="col-md-8 mb-3">
          <Comments users={users} user={user} comments={comments} />
        </div>
      </div>
    </div>
  )
}

UserPage.propTypes = {
  users: PropTypes.array,
  id: PropTypes.string
}

export default UserPage
