import React from "react"
import PropTypes from "prop-types"
import isEqual from "../../utils/isEqual"

const GroupList = ({ items, value, content, onSelect, selectedItem }) => {
  const itemsArr = Array.isArray(items) ? items : Object.values(items)

  return (
    <ul className="list-group">
      {itemsArr.map((item) => (
        <li
          className={
            "list-group-item" +
            (selectedItem && isEqual(item, selectedItem) ? " active" : "")
          }
          id={item[value]}
          key={item[value]}
          onClick={() => onSelect(item)}
          role="button"
        >
          {item[content]}
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
