import React from "react"
import PropTypes from "prop-types"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/selectField"
import api from "../../../api"
import { useEffect, useState } from "react/cjs/react.development"
import MultiSelectField from "../../common/form/multiSelectField"
import RadioField from "../../common/form/radioField"
import { validator } from "../../../utils/validator"
import { useHistory } from "react-router"

const EditUserPage = ({ users, id, onSubmit }) => {
  const [professions, setProfession] = useState()
  const [qualities, setQualities] = useState()
  const user = users.find((user) => user._id === id)
  const [errors, setErrors] = useState({})
  const history = useHistory()

  const [userData, setUserData] = useState({
    ...user,
    email: user.email || "",
    sex: user.sex || "other"
  })

  const isError = Object.keys(errors).length

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  const handleChange = (target) => {
    setUserData((prev) => ({ ...prev, ...target }))
  }

  const handleSubmit = () => {
    onSubmit(id, userData)
    history.push("/users")
  }

  const validatorConfig = {
    name: {
      required: {
        message: "Поле 'Имя' должно быть заполнено"
      }
    },
    email: {
      required: {
        message: "Поле 'Email' должно быть заполнено"
      },
      isEmail: {
        message: "Введите корректный почтовый адрес"
      }
    }
  }

  const validate = () => {
    const errors = validator(userData, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    validate()
  }, [userData])

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {" "}
          <h3>Edit user data</h3>
          <form>
            <TextField
              label="Имя"
              name="name"
              value={userData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Email"
              name="email"
              value={userData.email || ""}
              placeholder="Ваш почтовый адрес..."
              onChange={handleChange}
              error={errors.email}
            />
            <SelectField
              label="Ваша профессия"
              name="profession"
              value={userData.profession.name}
              onChange={handleChange}
              defaultOption={userData.profession.name}
              options={professions}
            />
            <MultiSelectField
              options={qualities}
              defaultValue={[...userData.qualities]}
              onChange={handleChange}
              name="qualities"
              label="Ваши качества:"
            />
            <RadioField
              label="Выберите ваш пол"
              value={userData.sex}
              defaultValue="other"
              name="sex"
              onChange={handleChange}
              options={[
                { name: "male", value: "male" },
                { name: "female", value: "female" },
                { name: "other", value: "other" }
              ]}
            />

            <button
              disabled={isError}
              className="btn btn-primary w-100 mx-auto mb-2"
              onClick={handleSubmit}
            >
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

EditUserPage.propTypes = {
  users: PropTypes.array,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  id: PropTypes.string
}
export default EditUserPage
