import React from "react"
import PropTypes from "prop-types"
import TableHeader from "./tableHeader"
import TableBody from "./tableBody"
import Bookmark from "./bookmark"

const UsersTable = ({ users, selectClick, onDelete, ...rest }) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: { name: "Качества" },
    profession: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встречался, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          onClick={() => selectClick(user._id)}
          marked={user.bookmark}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger"
          id={user._id}
          onClick={() => onDelete(user._id, users.length - 1)}
        >
          Delete
        </button>
      )
    }
  }
  return (
    <table className="table">
      <TableHeader columns={columns} {...rest} />
      <TableBody {...{ columns, data: users }} />
    </table>
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  currentSort: PropTypes.object.isRequired,
  selectClick: PropTypes.func.isRequired
}

export default UsersTable
