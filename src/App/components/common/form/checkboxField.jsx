import React from "react"
import PropTypes from "prop-types"

const CheckboxField = ({ value, onChange, name, children, error }) => {
  const handleChange = () => {
    onChange({ [name]: !value })
  }

  const getInputClasses = () => {
    return "form-check-input" + (error ? " is-invalid" : "")
  }

  return (
    <div className="mb-4">
      <div className="form-check">
        <input
          className={getInputClasses()}
          type="checkbox"
          value={value}
          id={name}
          onChange={handleChange}
          checked={value}
          name={name}
        />
        <label className="form-check-label is-invalid" htmlFor={name}>
          {children}
        </label>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

CheckboxField.propTypes = {
  options: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  value: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  error: PropTypes.string
}

export default CheckboxField
