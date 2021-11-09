import React from "react"
import PropTypes from "prop-types"
import { Comment } from ".."
import { useState } from "react/cjs/react.development"

const CommentList = ({ user, users, comments, onDelete, targetUser }) => {
  // const [user, setUser] = useState({})
  const userComments = comments.filter(
    (item) =>
      (targetUser === item.userId && user._id === item.pageId) ||
      (targetUser === item.pageId && user._id === item.userId)
  )
  /* console.log("userComments", userComments)
  console.log("user", user)
  console.log("targetUser", targetUser) */

  return userComments.length ? (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr />
        {userComments.length &&
          userComments.map((comm, i) => {
            return (
              <Comment comm={comm} users={users} key={i} onDelete={onDelete} />
            )
          })}
      </div>
    </div>
  ) : null
}

CommentList.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
  comments: PropTypes.array,
  onDelete: PropTypes.func,
  targetUser: PropTypes.string
}

export default CommentList
