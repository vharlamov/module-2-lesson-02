import React from "react"
import { useState, useEffect } from "react/cjs/react.development"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import api from "../../api"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import CheckboxField from "../common/form/checkboxField"

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "other",
    qualities: [],
    license: false
  })
  const [errors, setErrors] = useState({})
  const [professions, setProfession] = useState()
  const [qualities, setQualities] = useState()

  const isError = Object.keys(errors).length

  const handleChange = (target) => {
    setData((prevData) => ({ ...prevData, ...target }))
  }

  const validatorConfig = {
    email: {
      required: {
        message: "Поле 'Email' должно быть заполнено"
      },
      isEmail: {
        message: "Введите корректный почтовый адрес"
      }
    },
    password: {
      required: {
        message: "Поле 'Пароль' должно быть заполнено"
      },
      isDigit: {
        message: "Пароль должен содержать цифру"
      },
      isCapital: {
        message: "Пароль должен содержать заглавную букву"
      },
      min: {
        value: 8,
        message: `Длина пароля должна быть не менее 8 символов`
      }
    },
    profession: {
      required: {
        message: "Необходимо выбрать профессию"
      }
    },
    license: {
      required: {
        message: "Вы не можете использовать сервис без подтверждения лицензии"
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  useEffect(() => {
    validate()
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Выберите вашу профессию"
        value={data.profession}
        error={errors.profession}
        onChange={handleChange}
        defaultOption="Choose..."
        options={professions}
      />
      <RadioField
        label="Выберите ваш пол"
        value={data.sex}
        name="sex"
        onChange={handleChange}
        options={[
          { name: "male", value: "male" },
          { name: "female", value: "female" },
          { name: "other", value: "other" }
        ]}
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        name="qualities"
        label="Ваши качества:"
      />
      <CheckboxField
        onChange={handleChange}
        value={data.license}
        name="license"
        error={errors.license}
      >
        Подтвердить <a href="#">лицензионное соглашение</a>
      </CheckboxField>
      <button disabled={isError} className="btn btn-primary w-100 mx-auto mb-2">
        Submit
      </button>
    </form>
  )
}

export default RegisterForm
