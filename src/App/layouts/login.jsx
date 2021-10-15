import React, { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import TextField from "../components/textField"
import { validator } from "../utils/validator"

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})

  const isError = Object.keys(errors).length

  const handleChange = ({ target }) => {
    setData((prevData) => ({ ...prevData, [target.name]: target.value }))
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
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-3">Login</h3>
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
            <button
              disabled={isError}
              className="btn btn-primary w-100 mx-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
