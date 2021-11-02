import React from "react"
import PropTypes from "prop-types"

const UserQualities = ({ user }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          {user.qualities.map((qual) => (
            <span key={qual._id} className={`badge bg-${qual.color} mx-2`}>
              {qual.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

UserQualities.propTypes = {
  user: PropTypes.object
}
export default UserQualities
