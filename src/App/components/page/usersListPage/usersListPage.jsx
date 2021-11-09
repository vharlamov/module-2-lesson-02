import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import UsersTable from "../../ui/usersTable"
import Pagination from "../../common/pagination"
import StatusBar from "../../ui/statusbar"
import GroupList from "../../common/groupList"
import { useParams } from "react-router"
import Search from "../../search"
import api from "../../../api"
import isEqual from "../../../utils/isEqual"
import _ from "lodash"
import { paginate } from "../../../utils/paginate"

const UsersListPage = () => {
  const [users, setUsers] = useState([])

  const pageSize = 5
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selected, setSelected] = useState({})
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
  const [searchData, setSearchData] = useState("")

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    setSelected(users.reduce((a, u) => ({ ...a, [u._id]: u.bookmark }), {}))
  }, [users])

  const handleProfSelect = (item) => {
    setSelectedProf(item)
    setCurrentPage(1)
    setSearchData("")
  }

  const handleUserSearch = (e) => {
    e.preventDefault()
    const value = e.target.value

    setSelectedProf()
    setSearchData(value)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (data) => {
    setSortBy(data)
  }

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

  const clearFilter = () => {
    setSelectedProf()
  }

  const foundUser = users.filter(
    (user) =>
      searchData && user.name.toLowerCase().includes(searchData.toLowerCase())
  )

  const filteredUsers = selectedProf
    ? users.filter((user) => isEqual(user.profession, selectedProf))
    : searchData
    ? foundUser
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

      <div className="d-flex flex-column">
        <StatusBar users={filteredUsers} />
        <Search onSearch={handleUserSearch} />
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
    </div>
  )
}

UsersListPage.propTypes = {
  selectedProf: PropTypes.object,
  professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  currentPage: PropTypes.number,
  filteredUsers: PropTypes.array,
  users: PropTypes.array,
  selected: PropTypes.object,
  sortBy: PropTypes.object,
  count: PropTypes.number,
  pageSize: PropTypes.number,
  selectClick: PropTypes.func,
  onDelete: PropTypes.func,
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
  clearFilter: PropTypes.func,
  onPageChange: PropTypes.func,
  onSearch: PropTypes.func
}

export default UsersListPage
