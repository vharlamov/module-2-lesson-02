import React from "react"
import PropTypes from "prop-types"

const TableHeader = ({ onSort, columns, currentSort }) => {
  const handleSort = (item) => {
    if (currentSort.path === item) {
      onSort((prev) => ({
        ...prev,
        order: currentSort.order === "asc" ? "desc" : "asc"
      }))
    } else {
      onSort({ path: item, order: "asc" })
    }
  }

  const makeArrow = (order, path) => {
    if (currentSort.path !== path) return
    const dir = order === "asc" ? "down" : "up"
    return <i className={`bi bi-caret-${dir}-fill ms-2`}></i>
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column, i) => (
          <th
            key={i}
            onClick={() =>
              columns[column].path ? handleSort(columns[column].path) : null
            }
            {...{ role: columns[column].path && "button" }}
            scope="col"
          >
            {columns[column].name}
            {makeArrow(currentSort.order, columns[column].path)}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  currentSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  onSelect: PropTypes.func
}

export default TableHeader
