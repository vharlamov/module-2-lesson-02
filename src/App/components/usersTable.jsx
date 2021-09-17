import React from "react"
import User from "./user"
import PropTypes from "prop-types"
import TableHeader from "./tableHeader"
import TableBody from "./tableBody"

const UsersTable = ({ users, ...rest }) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: { name: "Качества" },
    profession: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встречался, раз" },
    rate: { path: "rate", name: "Оценка" },
    selected: { path: "selected", name: "Избранное" },
    delete: {}
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
  currentSort: PropTypes.object.isRequired
}

export default UsersTable
