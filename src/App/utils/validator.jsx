export function validator(data, config) {
  const errors = {}

  function validate(method, data, config) {
    let statusValidate

    switch (method) {
      case "required":
        statusValidate = typeof data === "boolean" ? !data : data.trim() === ""
        break
      case "isEmail": {
        const emailRegExp = /^[\wА-Яа-я\.]+@[\wА-Яа-я]+\.\w+/g
        statusValidate = !emailRegExp.test(data.trim())
        break
      }
      case "isDigit": {
        const passHasDigit = /\d+/g
        statusValidate = !passHasDigit.test(data)
        break
      }
      case "isCapital": {
        const passHasCapital = /[A-ZА-Я]+/g
        statusValidate = !passHasCapital.test(data)
        break
      }
      case "min": {
        statusValidate = data.length < config.value
        break
      }
      case "isTrue": {
        statusValidate = !data
        break
      }
    }

    return statusValidate
      ? typeof config.message === "function"
        ? config.message()
        : config.message
      : null
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      )
      if (error && !errors[fieldName]) errors[fieldName] = error
    }
  }

  return errors
}
