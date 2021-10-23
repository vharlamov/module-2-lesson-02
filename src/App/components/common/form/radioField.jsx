import React from "react"
import PropTypes from "prop-types"

const RadioField = ({ options, name, label, value, onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ [target.name]: target.value })
  }

  return (
    <div className="mb-4">
      <label className="form-label me-3">{label}</label>
      <div>
        {options.map((option) => (
          <div
            key={option.name + "_" + option.value}
            className="form-check form-check-inline"
          >
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={option.name + "_" + option.value}
              value={option.value}
              checked={option.value === value}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor={option.name + "_" + option.value}
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

RadioField.propTypes = {
  options: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func
}

export default RadioField
