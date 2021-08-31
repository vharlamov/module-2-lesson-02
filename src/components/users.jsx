import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import User from './user'

const Head = () => {
  return (
    <thead>
      <tr>
        <th>Имя</th>
        <th>Качества</th>
        <th>Профессия</th>
        <th>Встречался, раз</th>
        <th>Оценка</th>
        <th>Избранное</th>
        <th></th>
      </tr>
    </thead>
  )
}

const createPage = (users, size, num) => {
  const start = size * (num - 1)
  const pageUsers = users.slice(start, start + size)

  return pageUsers
}

const Users = props => {

  const {users, pageSize, pageNum, ...rest} = props
  
  return (
    <>
      <table className='table'>
        <Head />
        <tbody>
          {createPage(users, pageSize, pageNum).map((user, i, arr) => <User 
            user={user} 
            key={user._id}
            items={arr.length} 
            {...rest}
            />
          )}
        </tbody>
      </table>
    </>
  )
}

export default Users