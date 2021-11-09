import React, { useState, useEffect } from "react"
import { User, Comments } from "."
import PropTypes from "prop-types"
import api from "../../../api"
import { useHistory, useParams } from "react-router"

const UserPage = () => {
  const { userId } = useParams()
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [comments, setComments] = useState([])
  const history = useHistory()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  useEffect(() => {
    api.comments.fetchAll().then((data) => setComments(data))
  })

  const handleClick = () => {
    history.push(`/users/${userId}/edit`)
  }

  return users ? (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          {user ? (
            <User user={user} onClick={handleClick} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="col-md-8 mb-3">
          <Comments users={users} user={user} comments={comments} />
        </div>
      </div>
    </div>
  ) : null
}

UserPage.propTypes = {
  users: PropTypes.array,
  id: PropTypes.string
}

export default UserPage
