import React, {useState} from 'react'
import api from './api'
import 'bootstrap/dist/css/bootstrap.css'
import StatusBar from './components/statusbar'
import Users from './components/users'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const [selected, setSelected] = useState(users.reduce((a, u) => ({...a, [u._id]: false}), {}))

  const handleDelete = id => {
    setUsers(users.filter(user => user._id !== id))
  }

  const toggleMark = id => {
    const newSelected = {...selected}
    newSelected[id] = !newSelected[id]

    setSelected(newSelected)
  }

  return ( 
    <>
      <StatusBar users={users} />
      <Users 
        users={users}
        onDelete={handleDelete}
        selected={selected}
        selectClick={toggleMark}
      />
    </>
   )
}
 
export default App