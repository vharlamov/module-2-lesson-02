import PropTypes from "prop-types"

const Bookmark = (props) => {
  const { marked } = props
  return <i className={`bi bi-bookmark${marked ? "-fill" : ""}`}></i>
}

Bookmark.propTypes = {
  marked: PropTypes.bool.isRequired
}

export default Bookmark
