import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "bootstrap/dist/css/bootstrap.css"
import UsersTable from "./usersTable"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"
import GroupList from "./groupList"
import api from "../api/index"
import StatusBar from "./statusbar"
import isEqual from "../utils/isEqual"
import _ from "lodash"

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const pageSize = 5
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
  const [selected, setSelected] = useState({})

  useEffect(() => {
    setSelected(users.reduce((a, u) => ({ ...a, [u._id]: u.bookmark }), {}))
  }, [])

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  const toggleMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark }
        }
        return user
      })
    )
    setSelected({ ...selected, [id]: !selected.id })
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfSelect = (item) => {
    setSelectedProf(item)
    setCurrentPage(1)
  }

  const handleSort = (data) => {
    setSortBy(data)
  }

  const clearFilter = () => {
    setSelectedProf()
  }

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => isEqual(user.profession, selectedProf))
      : users

    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const handleDelete = (id) => {
      if (!(userCrop.length - 1)) setCurrentPage(currentPage - 1)
      setUsers(users.filter((u) => u._id !== id))
    }

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onSelect={handleProfSelect}
              value="_id"
              content="name"
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}

        {count > 0 ? (
          <div className="d-flex flex-column">
            <StatusBar users={filteredUsers} />
            <UsersTable
              users={userCrop}
              selected={selected}
              selectClick={toggleMark}
              onDelete={handleDelete}
              onSort={handleSort}
              currentSort={sortBy}
            />
            <nav aria-label="Page navigation example">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </nav>
          </div>
        ) : null}
      </div>
    )
  }
  return "loading..."
}

export default Users
