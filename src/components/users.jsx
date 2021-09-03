import { useState } from "react"
import PropTypes from "prop-types"
import "bootstrap/dist/css/bootstrap.css"
import User from "./user"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"

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
  const { users, ...rest } = props
  const count = users.length
  const pageSize = 5
  const [currentPage, setCurrentPage] = useState(1)
  const userCrop = paginate(users, currentPage, pageSize)

  const handlePageChange = (pageIndex) => {
    console.log("pageIndex", pageIndex)
    setCurrentPage(pageIndex)
  }

  return (
    <>
      {count > 0 ? (
        <table className="table">
          <Head />
          <tbody>
            {userCrop.map((user, i, arr) => (
              <User user={user} key={user._id} items={arr.length} {...rest} />
            ))}
          </tbody>
        </table>
      ) : null}
      <nav aria-label="Page navigation example">
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </nav>
    </>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
