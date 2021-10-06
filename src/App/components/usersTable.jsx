import React from "react"
import PropTypes from "prop-types"
import Bookmark from "./bookmark"
import Qualities from "./qualities"
import Table from "./table"
import { Link } from "react-router-dom"

const UsersTable = ({
  users,
  selectClick,
  selected,
  onDelete,
  onSort,
  onSelect,
  currentSort
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => {
        return <Link to={`users/${user._id}`}>{user.name}</Link>
      }
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
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
    <Table
      {...{
        columns,
        selected,
        onSort,
        data: users,
        onSelect: onSelect,
        currentSort
      }}
    ></Table>
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  currentSort: PropTypes.object.isRequired,
  selectClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  selected: PropTypes.object.isRequired
}

export default UsersTable
