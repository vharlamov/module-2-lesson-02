import React from "react"
import PropTypes from "prop-types"

const Search = ({ onSearch }) => {
  return (
    <form className="input-group mt-2" onChange={onSearch}>
      <input type="text" placeholder="Search..." className="form-control" />
    </form>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default Search
