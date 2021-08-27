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

const Users = props => {

  const {users, ...rest} = props
  
  return (
    <>
      <table className='table'>
        <Head />
        <tbody>
          {users.map(user => <User 
            user={user} 
            key={user._id} 
            {...rest}
            />
          )}
        </tbody>
      </table>
    </>
  )
}

export default Users