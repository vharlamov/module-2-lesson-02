import React from "react"
import { useState, useEffect } from "react/cjs/react.development"
import { validator } from "../../utils/validator"
import CheckboxField from "../common/form/checkboxField"
import TextField from "../common/form/textField"
// import * as yup from "yup"

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false })
  const [errors, setErrors] = useState({})

  const isError = Object.keys(errors).length

  const handleChange = (target) => {
    setData((prevData) => ({ ...prevData, ...target }))
  }

  /* let validateScheme = yup.object().shape({
    password: yup
      .string()
      .required("Поле 'Пароль' должно быть заполнено")
      .matches(/(?=.*[A-ZА-Я])/, "Пароль должен содержать заглавную букву")
      .matches(/(?=.*\d)/, "Пароль должен содержать цифру")
      .matches(
        /(?=.*[!@#$%^&*])/,
        "Пароль должен содержать специальный знак [!@#$%^&*]"
      )
      .matches(/(?=.{8})/, "Длина пароля должна быть не менее 8 символов"),
    email: yup
      .string()
      .required("Поле 'Email' должно быть заполнено")
      .email("Введите корректный почтовый адрес")
  }) */

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
    stayOn: {
      required: {
        message: "Вы не можете использовать сервис без подтверждения лицензии"
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    /* validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message })) */
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

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
      <CheckboxField onChange={handleChange} value={data.stayOn} name="stayOn">
        Оставаться в системе
      </CheckboxField>

      <button disabled={isError} className="btn btn-primary w-100 mx-auto mb-2">
        Submit
      </button>
    </form>
  )
}

export default LoginForm
