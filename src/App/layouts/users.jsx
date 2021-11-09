import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "bootstrap/dist/css/bootstrap.css"
import api from "../api/index"
import _ from "lodash"
import { useParams } from "react-router"
import UsersListPage from "../components/page/usersListPage"
import { UserPage } from "../components/page/userPage"
import EditUserPage from "../components/page/editUserPage/editUserPage"

const Users = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const { userId, edit } = useParams()
  // console.log("Users component", userId)

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  useEffect(() => {
    // console.log("users received")
    setUser(users.find((user) => user._id === userId))
  }, [users])

  return (
    <>
      {edit && userId ? (
        <EditUserPage />
      ) : userId ? (
        <UserPage />
      ) : (
        <UsersListPage />
      )}
    </>
  )
}

Users.propsType = {
  data: PropTypes.array
}

export default Users
