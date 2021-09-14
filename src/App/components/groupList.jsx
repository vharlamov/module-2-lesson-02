import React from "react"
import PropTypes from "prop-types"
import isEqual from "../utils/isEqual"

const GroupList = ({ items, value, content, onSelect, selectedItem }) => {
  const itemsArr = Object.getPrototypeOf(items).map
    ? items
    : Object.values(items)

  return (
    <ul className="list-group">
      {itemsArr.map((i) => (
        <li
          className={
            "list-group-item" +
            (selectedItem && isEqual(i, selectedItem) ? " active" : "")
          }
          id={i[value]}
          key={i[value]}
          onClick={() => onSelect(i)}
          role="button"
        >
          {i[content]}
        </li>
      ))}
    </ul>
  )
}

GroupList.defaultProps = {
  value: "id",
  content: "name"
}

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
}

export default GroupList
