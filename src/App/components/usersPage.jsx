import React from "react"
import PropTypes from "prop-types"
import UsersTable from "../components/usersTable"
import Pagination from "../components/pagination"
import StatusBar from "../components/statusbar"
import GroupList from "../components/groupList"
import { useParams } from "react-router"

const UsersPage = (props) => {
  const {
    selectedProf,
    professions,
    currentPage,
    filteredUsers,
    users,
    selected,
    sortBy,
    count,
    pageSize,
    selectClick,
    onDelete,
    onSort,
    onSelect,
    clearFilter,
    onPageChange
  } = props

  const { userId } = useParams()

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onSelect={onSelect}
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
            users={users}
            selected={selected}
            selectClick={selectClick}
            onDelete={onDelete}
            onSort={onSort}
            currentSort={sortBy}
          />
          <nav aria-label="Page navigation example">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </nav>
        </div>
      ) : null}
    </div>
  )
}

UsersPage.propTypes = {
  selectedProf: PropTypes.object,
  professions: PropTypes.array,
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
  onPageChange: PropTypes.func
}

export default UsersPage
