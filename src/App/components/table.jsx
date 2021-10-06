import React from "react"
import PropTypes from "prop-types"
import TableBody from "./tableBody"
import TableHeader from "./tableHeader"

const Table = ({ columns, onSort, data, onSelect, currentSort, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ onSort, onSelect, columns, currentSort }} />
          <TableBody {...{ data, columns }} />
        </>
      )}
    </table>
  )
}

Table.propTypes = {
  columns: PropTypes.object.isRequired,
  onSort: PropTypes.func,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.object,
  currentSort: PropTypes.object,
  children: PropTypes.array
}

export default Table
