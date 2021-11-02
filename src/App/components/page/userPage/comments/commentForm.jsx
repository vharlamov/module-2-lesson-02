import React from "react"
import PropTypes from "prop-types"
import SelectField from "../../../common/form/selectField"
import TextAreaField from "../../../common/form/textareaField"

const CommentForm = ({ users, value, onChange, onSubmit, errors }) => {
  const isError = Object.keys(errors).length !== 0

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          <SelectField
            name="targetUser"
            label={null}
            value={null}
            onChange={onChange}
            defaultOption="Выберите пользователя"
            options={users}
            error={errors.targetUser}
          />
          <TextAreaField
            name="text"
            label={null}
            value={value}
            onChange={onChange}
            defaultValue="Текст комментария..."
            options={users}
            error={errors.text}
          />
          <button
            className="btn btn-primary w-100 mx-auto mb-2"
            disabled={isError}
            onClick={onSubmit}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  )
}

CommentForm.propTypes = {
  users: PropTypes.array,
  value: PropTypes.string,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}

export default CommentForm
