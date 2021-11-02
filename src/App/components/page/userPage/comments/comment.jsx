import React from "react"
import PropTypes from "prop-types"
import formatDate from "../../../../utils/formatDate"

const Comment = ({ comm, users, onDelete }) => {
  const date = formatDate(comm.created_at)
  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
              src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
              )
                .toString(36)
                .substring(7)}.svg`}
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {users.find((user) => user._id === comm.userId).name}
                    <span className="small">{date}</span>
                  </p>
                  <button
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={() => onDelete(comm._id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <p className="small mb-0">{comm.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  users: PropTypes.array,
  comm: PropTypes.object,
  onDelete: PropTypes.func
}

export default Comment
