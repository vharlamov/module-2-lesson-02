import React, {useState} from 'react'
import api from './api'
import 'bootstrap/dist/css/bootstrap.css'
import StatusBar from './components/statusbar'
import Users from './components/users'
import PageButtons from './components/pagebuttons'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const [selected, setSelected] = useState(users.reduce((a, u) => ({...a, [u._id]: false}), {}))

  let [currentPage, setCurrentPage] = useState(1)

  const pageSize = 5

  const pagesQuantity = Math.ceil(users.length / pageSize)

  const pageButtonClick = num => {
    setCurrentPage(num)
  }

  const handleDelete = (id, pageItems) => {
    setUsers(users.filter(user => user._id !== id))
    if (!pageItems) setCurrentPage(currentPage - 1)
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
        pageSize = {pageSize}
        pageNum = {currentPage}
      />
      {pagesQuantity > 1 
        ? <PageButtons 
            quantity={pagesQuantity}
            onclick={pageButtonClick}
          />
        : null
      }
    </>
   )
}
 
export default App