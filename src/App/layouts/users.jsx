import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "bootstrap/dist/css/bootstrap.css"
import { paginate } from "../utils/paginate"
import api from "../api/index"
import isEqual from "../utils/isEqual"
import _ from "lodash"
import { useParams } from "react-router"
import UsersListPage from "../components/page/usersListPage"
import UserCard from "../components/page/userPage"
import EditUserPage from "../components/page/editUserPage/editUserPage"

const Users = () => {
  const [users, setUsers] = useState([])
  const { userId, edit } = useParams()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const pageSize = 5
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
  const [selected, setSelected] = useState({})
  const [searchData, setSearchData] = useState("")

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

  const handleUserSearch = (e) => {
    e.preventDefault()
    const value = e.target.value

    setSelectedProf()
    setSearchData(value)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfSelect = (item) => {
    setSelectedProf(item)
    setCurrentPage(1)
    setSearchData("")
  }

  const handleSort = (data) => {
    setSortBy(data)
  }

  const clearFilter = () => {
    setSelectedProf()
  }

  const handleEdit = (id, data) => {
    setUsers(users.map((user) => (user._id === id ? data : user)))
    api.users.update(id, data)
  }

  if (users.length) {
    const foundUser = users.filter(
      (user) => searchData && user.name.includes(searchData)
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
      <>
        {edit ? (
          <EditUserPage users={users} id={userId} onSubmit={handleEdit} />
        ) : userId ? (
          <UserCard users={users} id={userId} />
        ) : (
          <UsersListPage
            selectedProf={selectedProf}
            professions={professions}
            currentPage={currentPage}
            filteredUsers={filteredUsers}
            users={userCrop}
            selected={selected}
            sortBy={sortBy}
            count={count}
            pageSize={pageSize}
            selectClick={toggleMark}
            onDelete={handleDelete}
            onSort={handleSort}
            onSelect={handleProfSelect}
            clearFilter={clearFilter}
            onPageChange={handlePageChange}
            onSearch={handleUserSearch}
          />
        )}
      </>
    )
  }
  return null
}

Users.propsType = {
  data: PropTypes.array
}

export default Users
