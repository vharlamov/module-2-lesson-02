import React from "react"
import PropTypes from "prop-types"

const TableHeader = ({ onSort, currentSort, columns }) => {
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

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={() =>
              columns[column].path ? handleSort(columns[column].path) : null
            }
            {...{ role: columns[column].path && "button" }}
            scope="col"
          >
            {columns[column].name}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  currentSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableHeader
