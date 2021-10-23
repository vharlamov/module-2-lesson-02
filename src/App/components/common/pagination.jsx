import _ from "lodash"
import PropTypes from "prop-types"

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props
  const pageCount = Math.ceil(itemsCount / pageSize)
  const pages = _.range(1, pageCount + 1)
  if (pageCount === 1) return null

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
              style={{ cursor: "pointer" }}
            >
              <span className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </span>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination
