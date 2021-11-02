import React from "react"
import PropTypes from "prop-types"

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  error,
  defaultValue
}) => {
  const handleChange = ({ target }) => {
    onChange({
      [target.name]: target.value
    })
  }
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "")
  }

  return (
    <div className="mb-4">
      <label htmlFor={name}> {label}</label>
      <div className="input-group has-validation">
        <textarea
          type="text"
          id={name}
          name={name}
          value={value || ""}
          onChange={handleChange}
          className={getInputClasses()}
          placeholder={defaultValue || ""}
          rows="3"
        />

        {error && <div className="invalid-feedback ">{error}</div>}
      </div>
    </div>
  )
}
TextAreaField.defaultProps = {
  type: "text"
}

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default TextAreaField
