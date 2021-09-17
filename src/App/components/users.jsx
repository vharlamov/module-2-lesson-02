import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "bootstrap/dist/css/bootstrap.css"
import User from "./user"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"
import GroupList from "./groupList"
import api from "../api/index"
import StatusBar from "./statusbar"
import isEqual from "../utils/isEqual"

const Head = () => {
  return (
    <thead>
      <tr>
        <th>Имя</th>
        <th>Качества</th>
        <th>Профессия</th>
        <th>Встречался, раз</th>
        <th>Оценка</th>
        <th>Избранное</th>
        <th></th>
      </tr>
    </thead>
  )
}

const Users = (props) => {
  const { users, onDelete, ...rest } = props
  const pageSize = 5
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const filteredUsers = selectedProf
    ? users.filter((i) => isEqual(i.profession, selectedProf))
    : users
  const count = filteredUsers.length
  const userCrop = paginate(filteredUsers, currentPage, pageSize)
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
          <table className="table">
            <Head />
            <tbody>
              {userCrop.map((user, i, arr) => (
                <User
                  user={user}
                  key={user._id}
                  items={arr.length}
                  selected={selected}
                  selectClick={toggleMark}
                  onDelete={handleEmptyPage}
                  {...rest}
                />
              ))}
            </tbody>
          </table>
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
  onDelete: PropTypes.func.isRequired
}

export default Users
