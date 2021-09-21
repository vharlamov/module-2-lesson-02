import PropTypes from "prop-types"

const Bookmark = ({ marked, ...rest }) => {
  return (
    <button {...rest}>
      <i className={`bi bi-bookmark${marked ? "-fill" : ""}`}></i>
    </button>
  )
}

Bookmark.propTypes = {
  marked: PropTypes.bool
}

export default Bookmark
