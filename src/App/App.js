import { useState, useEffect } from "react"
import api from "./api/index"
import "bootstrap/dist/css/bootstrap.css"
import Users from "./components/users"

const App = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u._id !== id))
  }

  const toggleMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark }
        }
        return user
      })
    )
  }
  return (
    <Users
      users={users || []}
      selectClick={toggleMark}
      onDelete={handleDelete}
    />
  )
}

export default App
