import React from "react"
import Select from "react-select"
import PropTypes from "prop-types"

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray = options
    ? !Array.isArray(options) && typeof options === "object"
      ? Object.values(options).map((option) => ({
          value: option._id,
          label: option.name,
          color: option.color
        }))
      : options.map((option) => ({
          value: option._id,
          label: option.name,
          color: option.color
        }))
    : []

  const defaultValueArr = defaultValue
    ? defaultValue.map((item) => ({
        value: item._id,
        label: item.name,
        color: item.color
      }))
    : []

  const handleChange = (value) => {
    onChange({ name: name, value })
  }

  return (
    <div className="mb-4">
      <label className="form-label me-3">{label}</label>
      <Select
        isMulti
        defaultValue={defaultValueArr}
        closeMenuOnSelect={false}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.array
}

export default MultiSelectField
