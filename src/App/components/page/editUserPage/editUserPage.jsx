import React from "react"
import PropTypes from "prop-types"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/selectField"
import api from "../../../api"
import { useEffect, useState } from "react/cjs/react.development"
import MultiSelectField from "../../common/form/multiSelectField"
import RadioField from "../../common/form/radioField"
import { validator } from "../../../utils/validator"
import { useHistory, useParams } from "react-router"

const EditUserPage = () => {
  const [professions, setProfessions] = useState([])
  const [qualities, setQualities] = useState([])
  const [errors, setErrors] = useState({})
  const history = useHistory()
  const { userId } = useParams()
  const [userData, setUserData] = useState({})
  const isError = Object.keys(errors).length

  useEffect(() => {
    api.users.getById(userId).then((data) => setUserData(data))
  }, [])

  useEffect(() => {
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    validate()
  }, [userData])

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

  const getProfession = (id) => {
    return Object.values(professions).find((prof) => prof._id === id)
  }

  const getQualities = (arr) => {
    return arr.map((item) => ({
      _id: item.value || item._id,
      color: item.color,
      name: item.label || item.name
    }))
  }

  const handleChange = (target) => {
    if (target.name === "profession") {
      setUserData((prev) => ({
        ...prev,
        [target.name]: getProfession(target.value)
      }))
    } else if (target.name === "qualities") {
      setUserData((prev) => ({
        ...prev,
        [target.name]: getQualities(target.value)
      }))
    } else {
      setUserData((prev) => ({ ...prev, ...target }))
    }
  }

  const handleSubmit = () => {
    const { profession, qualities } = userData
    api.users.update(userId, userData)
    history.push(`/users/${userId}`)
  }

  return userData && Object.keys(userData).length ? (
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
              defaultValue={userData.qualities}
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
  ) : (
    <p>Loading...</p>
  )
}

EditUserPage.propTypes = {
  user: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  userId: PropTypes.string
}
export default EditUserPage
