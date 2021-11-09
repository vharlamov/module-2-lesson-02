import React from "react"
import PropTypes from "prop-types"

const Quality = ({ qual }) => {
  return (
    <span
      key={qual._id}
      className={`badge bg-${qual.color} mt-2 mx-2`}
      value={qual._id}
    >
      {qual.name}
    </span>
  )
}

Quality.propTypes = {
  qual: PropTypes.object
}
export default Quality
