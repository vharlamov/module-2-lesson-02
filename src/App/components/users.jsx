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

const Users = (props) => {
  const { users, onDelete } = props
  const pageSize = 12
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" })
  const filteredUsers = selectedProf
    ? users.filter((i) => isEqual(i.profession, selectedProf))
    : users
  const count = filteredUsers.length
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])
  const userCrop = paginate(sortedUsers, currentPage, pageSize)
  const [selected, setSelected] = useState({})

  const toggleMark = (id) => {
    const newSelected = { ...selected }
    newSelected[id] = !newSelected[id]

    setSelected(newSelected)
  }

  useEffect(() => {
    setSelected(users.reduce((a, u) => ({ ...a, [u._id]: false }), {}))
  }, [])

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {}, [selectedProf])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfSelect = (item) => {
    setSelectedProf(item)
    setCurrentPage(1)
  }

  const handleEmptyPage = (id) => {
    if (!(userCrop.length - 1)) setCurrentPage(currentPage - 1)
    onDelete(id)
  }

  const handleSort = (data) => {
    setSortBy(data)
  }

  const clearFilter = () => {
    setSelectedProf()
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
            onDelete={handleEmptyPage}
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

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
}

export default Users
