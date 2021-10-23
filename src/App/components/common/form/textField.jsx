import React from "react"
import PropTypes from "prop-types"
import { useState } from "react/cjs/react.development"
import { placeholder } from "@babel/types"

const TextField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPass = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = ({ target }) => {
    onChange({ [target.name]: target.value })
  }

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "")
  }

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group">
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
          placeholder={placeholder}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            onClick={handleShowPass}
          >
            <i className={"bi bi-eye" + (!showPassword ? "-slash" : "")}></i>
          </button>
        )}

        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: "text"
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextField
