import React from "react"
import PropTypes from "prop-types"

const SelectField = ({
  label,
  value,
  name,
  onChange,
  defaultOption,
  options,
  error
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options

  const handleChange = ({ target }) => {
    onChange({
      [target.name]: optionsArray.find((item) => item._id === target.value)
    })
  }

  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "")
  }

  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id="validationCustom04"
        value={value}
        name={name}
        onChange={handleChange}
      >
        <option value="">{defaultOption}</option>
        {optionsArray &&
          optionsArray.map((item) => (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          ))}
      </select>
      <div className="invalid-feedback">{error}</div>
    </div>
  )
}

SelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.oneOfType(PropTypes.array, PropTypes.object)
}

export default SelectField
